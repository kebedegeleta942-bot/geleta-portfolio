import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Icon } from "./Icon";
import { profile } from "../data/profile";

interface Values {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; text: string }
  | { kind: "info"; text: string }
  | { kind: "error"; text: string };

const empty: Values = { name: "", email: "", subject: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length === 0) e.name = "Please enter your name.";
  if (v.email.trim().length === 0) e.email = "Please enter your email address.";
  else if (!emailPattern.test(v.email.trim())) e.email = "That email address doesn't look right. Please check it.";
  if (v.subject.trim().length === 0) e.subject = "Please tell me what you would like to discuss.";
  if (v.message.trim().length < 10) e.message = "Please write a little more (at least 10 characters).";
  else if (v.message.length > 2000) e.message = "Please keep your message under 2000 characters.";
  return e;
}

const fields: { key: keyof Values; label: string; placeholder: string; type: string; autoComplete?: string }[] = [
  { key: "name", label: "Name", placeholder: "Your name", type: "text", autoComplete: "name" },
  { key: "email", label: "Email", placeholder: "Your email address", type: "email", autoComplete: "email" },
  { key: "subject", label: "Subject", placeholder: "What would you like to discuss?", type: "text" },
];

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const busy = useRef(false); // blocks duplicate submits even before React re-renders
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (key: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy.current) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "idle" });
      const first = (Object.keys(found) as (keyof Values)[])[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    // Spam trap: real visitors never see or fill this field.
    if (honeypot.current?.value) {
      setValues(empty);
      return;
    }

    // 1) Real form service, if configured.
    if (profile.formEndpoint) {
      busy.current = true;
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(profile.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, _subject: values.subject }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setValues(empty);
        setStatus({ kind: "sent", text: "Thank you! Your message has been sent. I'll get back to you soon." });
      } catch {
        // Entered information is kept so the visitor can retry.
        setStatus({
          kind: "error",
          text: profile.email
            ? `Sorry, the message could not be sent. Please try again, or email me directly at ${profile.email}.`
            : "Sorry, the message could not be sent. Please check your connection and try again.",
        });
      } finally {
        busy.current = false;
      }
      return;
    }

    // 2) No form service: open the visitor's own email app (nothing is claimed as sent).
    if (profile.email) {
      const body = `${values.message}\n\n${values.name} (${values.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "info", text: "Your email app should open with the message ready. Press send there to deliver it." });
      return;
    }

    // 3) Nothing configured: say so honestly.
    setStatus({
      kind: "info",
      text: "Messaging is not set up on this site yet, so nothing was sent. Please try another contact method.",
    });
  }

  const sending = status.kind === "sending";
  const control =
    "w-full rounded-lg border bg-bg px-3.5 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60";
  const border = (k: keyof Values) => (errors[k] ? "border-red-500" : "border-line");

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={sending} className="card-strong space-y-5 p-6 md:p-8">
      <div>
        <h3 className="font-display text-xl font-bold">Send me a message</h3>
        <p className="mt-1 text-sm text-muted">All fields are required.</p>
      </div>

      {fields.map((f) => (
        <div key={f.key}>
          <label htmlFor={`cf-${f.key}`} className="mb-1.5 block text-sm font-medium">
            {f.label}
          </label>
          <input
            id={`cf-${f.key}`}
            name={f.key}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            value={values[f.key]}
            onChange={set(f.key)}
            disabled={sending}
            required
            aria-invalid={errors[f.key] ? true : undefined}
            aria-describedby={errors[f.key] ? `cf-${f.key}-err` : undefined}
            className={`${control} ${border(f.key)}`}
          />
          {errors[f.key] && (
            <p id={`cf-${f.key}-err`} className="mt-1.5 text-xs text-red-500" role="alert">
              {errors[f.key]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          placeholder="Tell me about your idea, project, or opportunity."
          value={values.message}
          onChange={set("message")}
          disabled={sending}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={`${control} resize-y ${border("message")}`}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary w-full py-3.5 sm:w-auto" disabled={sending}>
        {sending ? (
          <>
            <Icon name="loader" size={16} className="animate-spin motion-reduce:animate-none" /> Sending...
          </>
        ) : (
          <>
            Send Message <Icon name="send" size={16} />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status.kind === "sent" && (
          <p className="flex items-start gap-2 rounded-lg border border-accent/40 bg-accent-soft p-3 text-sm">
            <Icon name="circle-check" size={18} className="mt-0.5 shrink-0 text-accent" />
            {status.text}
          </p>
        )}
        {status.kind === "info" && <p className="rounded-lg bg-surface-2 p-3 text-sm text-muted">{status.text}</p>}
        {status.kind === "error" && (
          <p className="flex items-start gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm" role="alert">
            <Icon name="alert" size={18} className="mt-0.5 shrink-0 text-red-500" />
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
