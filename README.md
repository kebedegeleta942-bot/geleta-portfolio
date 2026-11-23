# Geleta Kebede: Developer Portfolio

React + TypeScript + Vite + Tailwind CSS v4. Dark-first with a light theme, no animation or icon libraries (CSS motion and an inline icon set keep the bundle small).

## Run it

Requires Node.js 20.19+ (or 22+).

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript check
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## Fill in your details (all placeholders live in `src/data/`)

| File | What to do |
| --- | --- |
| `profile.ts` | Add `email`. Optionally add `photoUrl` (file in `public/`) and `formEndpoint` (e.g. Formspree). |
| `socialLinks.ts` | Set `href`/`display` for GitHub, LinkedIn, Telegram. Unset links are hidden in the hero and footer and shown as "[Add yours]" in Contact. |
| `public/Geleta-Kebede-Resume.pdf` | Replace the placeholder with your real resume (same name). |
| `skills.ts` | Review every level. Only change a level when it is true. |
| `projects.ts` | Add `images`, `github`, and your real `contribution` text. Append new projects to the array. |

### Adding project screenshots

1. Put images in `public/projects/<project-id>/` (WebP or optimized JPG, around 1600px wide).
2. In `src/data/projects.ts`, fill `images`:

```ts
images: [
  { src: "/projects/oromia-learnsphere/dashboard.webp", alt: "Student dashboard" },
  { src: "/projects/oromia-learnsphere/exam.webp", alt: "Exam practice screen" },
],
```

The first image becomes the card cover; all appear in the details dialog.

## Contact form behavior

The form validates name, email, subject and message. On submit it:

1. POSTs JSON to `formEndpoint` if you set one, otherwise
2. opens the visitor's email app addressed to `email` if you set one, otherwise
3. tells the visitor messaging is not configured yet (nothing is pretended to be sent).

## Deploy (Cloudflare Pages, same as your other projects)

- Git integration: build command `npm run build`, output directory `dist`.
- Or direct upload: run `npm run build`, then upload the `dist` folder.
- Any static host works (Netlify, Vercel, GitHub Pages with a base path set in `vite.config.ts`).

## Structure

```
src/
  components/  Navbar, Footer, ThemeToggle, SectionHeading, ProjectCard,
               ProjectModal, SkillCategory, ContactForm, CoverArt, Icon, Reveal, SocialIcons
  sections/    Hero, About, Skills, Projects, Interests, Philosophy, Contact
  data/        profile, projects, skills, interests, socialLinks
  hooks/       useTheme, useActiveSection, useReveal
  styles/      index.css (design tokens + Tailwind)
```
