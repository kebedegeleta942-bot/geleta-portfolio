/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * A small, safe formatter for question and explanation text. It turns plain text typed by an admin into a tree of
 * blocks (paragraphs, lists, tables, notes ...) that React then draws. Nothing here produces HTML, so typed text can
 * never inject markup. Maths between $ signs is passed through untouched for the existing MathText component.
 *
 * What an admin can type:
 *   blank line            new paragraph
 *   **bold**   *italic*   `code`
 *   - item                bullet list         1. item   numbered list (indent a line to continue the item)
 *   > text                note box            ## text   small heading
 *   | a | b |  then  | --- | --- |  then rows   table
 *   Core Concept: ...     Step-by-Step Solution: ...    Key Takeaway: ...      (explanations only)
 *   Yaada Ijoo: ...       Furmaata Tartiiba Tartiiban: ...   Hubadhu: ...      (the same three, in Afaan Oromoo)
 * Old plain-text explanations contain none of this and simply show as paragraphs.
 */

export type Inline =
  | { t: 'text'; v: string }
  | { t: 'b'; c: Inline[] }
  | { t: 'i'; c: Inline[] }
  | { t: 'code'; v: string }
  | { t: 'math'; v: string; display: boolean };

export type Block =
  | { k: 'p'; c: Inline[] }
  | { k: 'h'; c: Inline[] }
  | { k: 'ul'; items: Inline[][] }
  | { k: 'ol'; items: Inline[][]; start: number }
  | { k: 'quote'; c: Inline[] }
  | { k: 'code'; v: string }
  | { k: 'table'; head: Inline[][]; rows: Inline[][][] }
  | { k: 'step'; n: number; c: Inline[] };

export interface ExplanationDoc {
  body: Block[];
  concept?: Block[];
  steps?: Block[];
  takeaway?: Block[];
}

const isAlnum = (ch: string | undefined) => !!ch && /[0-9A-Za-zÀ-ɏሀ-፿]/.test(ch);

/** Splits one piece of text into plain text, bold, italic, code and maths. No regex look-behind (old phones). */
export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let buf = '';
  const flush = () => {
    if (buf) {
      out.push({ t: 'text', v: buf });
      buf = '';
    }
  };
  let i = 0;
  while (i < src.length) {
    const ch = src[i];

    if (ch === '$') {
      if (src.startsWith('$$', i)) {
        const end = src.indexOf('$$', i + 2);
        if (end > i + 2) {
          flush();
          out.push({ t: 'math', v: src.slice(i + 2, end), display: true });
          i = end + 2;
          continue;
        }
      } else {
        const end = src.indexOf('$', i + 1);
        if (end > i + 1 && src.slice(i + 1, end).indexOf('\n') === -1) {
          flush();
          out.push({ t: 'math', v: src.slice(i + 1, end), display: false });
          i = end + 1;
          continue;
        }
      }
    } else if (ch === '`') {
      const end = src.indexOf('`', i + 1);
      if (end > i + 1) {
        flush();
        out.push({ t: 'code', v: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    } else if (ch === '*' && src.startsWith('**', i)) {
      const end = src.indexOf('**', i + 2);
      if (end > i + 2) {
        flush();
        out.push({ t: 'b', c: parseInline(src.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    } else if (ch === '*') {
      const next = src[i + 1];
      const prev = i > 0 ? src[i - 1] : undefined;
      if (next && next !== ' ' && next !== '\n' && next !== '*' && !isAlnum(prev)) {
        let end = src.indexOf('*', i + 1);
        while (end > 0 && (src[end - 1] === ' ' || src[end + 1] === '*')) {
          end = src.indexOf('*', end + 1);
        }
        if (end > i + 1 && src.slice(i + 1, end).indexOf('\n') === -1 && !isAlnum(src[end + 1])) {
          flush();
          out.push({ t: 'i', c: parseInline(src.slice(i + 1, end)) });
          i = end + 1;
          continue;
        }
      }
    }

    buf += ch;
    i += 1;
  }
  flush();
  return out;
}

const SEPARATOR_ROW = /^\|?[\s:|-]+\|?$/;
const UL_ITEM = /^\s*[-*•]\s+(.*)$/;
const OL_ITEM = /^\s*(\d{1,3})[.)]\s+(.*)$/;

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map((c) => c.trim());
}

function isTableStart(lines: string[], i: number): boolean {
  const first = lines[i].trim();
  const second = (lines[i + 1] ?? '').trim();
  return (
    first.startsWith('|') &&
    first.indexOf('|', 1) > 0 &&
    second.indexOf('-') >= 0 &&
    second.indexOf('|') >= 0 &&
    SEPARATOR_ROW.test(second)
  );
}

function startsOtherBlock(lines: string[], i: number): boolean {
  const t = lines[i].trim();
  return (
    t.startsWith('```') ||
    t.startsWith('>') ||
    /^#{1,3}\s+\S/.test(t) ||
    UL_ITEM.test(lines[i]) ||
    OL_ITEM.test(lines[i]) ||
    isTableStart(lines, i)
  );
}

/** Turns text into blocks. */
export function parseBlocks(text: string): Block[] {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const t = raw.trim();
    if (!t) {
      i += 1;
      continue;
    }

    if (t.startsWith('```')) {
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      blocks.push({ k: 'code', v: body.join('\n') });
      continue;
    }

    const h = t.match(/^#{1,3}\s+(.+)$/);
    if (h) {
      blocks.push({ k: 'h', c: parseInline(h[1]) });
      i += 1;
      continue;
    }

    if (isTableStart(lines, i)) {
      const head = splitRow(lines[i]).map(parseInline);
      i += 2;
      const rows: Inline[][][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = splitRow(lines[i]).map(parseInline);
        while (cells.length < head.length) cells.push([]);
        rows.push(cells.slice(0, head.length));
        i += 1;
      }
      blocks.push({ k: 'table', head, rows });
      continue;
    }

    if (t.startsWith('>')) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        parts.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ k: 'quote', c: parseInline(parts.join('\n')) });
      continue;
    }

    const isUl = UL_ITEM.test(raw);
    const isOl = OL_ITEM.test(raw);
    if (isUl || isOl) {
      const items: Inline[][] = [];
      const firstNum = raw.match(OL_ITEM);
      const start = firstNum ? Number(firstNum[1]) : 1;
      while (i < lines.length) {
        const m = isUl ? lines[i].match(UL_ITEM) : lines[i].match(OL_ITEM);
        if (!m) break;
        const parts = [isUl ? m[1] : m[2]];
        i += 1;
        // indented lines belong to the same item
        while (
          i < lines.length &&
          /^\s{2,}\S/.test(lines[i]) &&
          !UL_ITEM.test(lines[i]) &&
          !OL_ITEM.test(lines[i])
        ) {
          parts.push(lines[i].trim());
          i += 1;
        }
        items.push(parseInline(parts.join('\n')));
      }
      blocks.push(isUl ? { k: 'ul', items } : { k: 'ol', items, start });
      continue;
    }

    const para: string[] = [t];
    i += 1;
    while (i < lines.length && lines[i].trim() && !startsOtherBlock(lines, i)) {
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ k: 'p', c: parseInline(para.join('\n')) });
  }
  return blocks;
}

const SECTION_LINE =
  /^\s*(core concept|concept|yaada ijoo|step-by-step solution|step by step solution|steps|furmaata tartiiba tartiiban|key takeaway|takeaway|hubadhu)\s*:\s*(.*)$/i;

type Section = 'concept' | 'steps' | 'takeaway';

function sectionOf(label: string): Section {
  const l = label.toLowerCase();
  if (l.indexOf('concept') >= 0 || l === 'yaada ijoo') return 'concept';
  if (l.indexOf('step') >= 0 || l === 'furmaata tartiiba tartiiban') return 'steps';
  return 'takeaway';
}

/** Turns numbered lists inside the steps section into numbered step blocks. */
function toSteps(blocks: Block[]): Block[] {
  const out: Block[] = [];
  let n = 0;
  for (const b of blocks) {
    if (b.k === 'ol') {
      for (const item of b.items) {
        n += 1;
        out.push({ k: 'step', n, c: item });
      }
    } else {
      out.push(b);
    }
  }
  return out;
}

/** Splits an explanation into its optional Concept / Steps / Takeaway parts plus any other text. */
export function parseExplanation(text: string): ExplanationDoc {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  // A first line that only repeats the card heading ("Explanation:" / "Furmaata :") is dropped.
  const firstAt = lines.findIndex((l) => l.trim() !== '');
  if (firstAt >= 0) {
    const m = lines[firstAt].match(/^\s*(explanation|furmaata)\s*:\s*(.*)$/i);
    if (m) lines[firstAt] = m[2];
  }
  const buckets: Record<'body' | Section, string[]> = {
    body: [],
    concept: [],
    steps: [],
    takeaway: [],
  };
  const seen: Record<Section, boolean> = { concept: false, steps: false, takeaway: false };
  let current: 'body' | Section = 'body';
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) inFence = !inFence;
    const m = inFence ? null : line.match(SECTION_LINE);
    if (m) {
      current = sectionOf(m[1]);
      seen[current] = true;
      if (m[2].trim()) buckets[current].push(m[2]);
      continue;
    }
    buckets[current].push(line);
  }
  const doc: ExplanationDoc = { body: parseBlocks(buckets.body.join('\n')) };
  if (seen.concept) doc.concept = parseBlocks(buckets.concept.join('\n'));
  if (seen.steps) doc.steps = toSteps(parseBlocks(buckets.steps.join('\n')));
  if (seen.takeaway) doc.takeaway = parseBlocks(buckets.takeaway.join('\n'));
  return doc;
}

/** Words that change the meaning of a question; they are highlighted in question text. */
export const EMPHASIS_WORDS = /\b(NOT|EXCEPT|TRUE|FALSE|MITI|MALEE|DHUGAA|SOBA)\b/;

/** Subjects whose practice labels are shown in Afaan Oromoo. */
export function usesOromoLabels(subject: string | undefined): boolean {
  return subject === 'Afaan Oromoo' || subject === 'Gadaa';
}

export interface ExplanationLabels {
  heading: string;
  concept: string;
  steps: string;
  takeaway: string;
}

export function explanationLabels(subject: string | undefined): ExplanationLabels {
  return usesOromoLabels(subject)
    ? {
        heading: 'Furmaata',
        concept: 'Yaada Ijoo',
        steps: 'Furmaata Tartiiba Tartiiban',
        takeaway: 'Hubadhu',
      }
    : {
        heading: 'Explanation',
        concept: 'Core Concept',
        steps: 'Step-by-Step Solution',
        takeaway: 'Key Takeaway',
      };
}
