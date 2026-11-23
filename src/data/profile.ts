/**
 * Core identity and site configuration.
 * Anything marked PLACEHOLDER is intentionally empty or clearly bracketed;
 * fill it in and the UI updates automatically.
 */
export const profile = {
  name: "Geleta Kebede",
  initials: "GK",
  role: "Computer Science & Engineering Student",
  location: "Ethiopia",
  tagline: "Learning. Building. Creating Impact.",

  /** PLACEHOLDER: your public email. Leave "" until you add it. */
  email: "kebedegeleta942@gmail.com",

  /** Path inside /public. Replace public/Geleta-Kebede-Resume.pdf with your real CV (keep the file name or update this). */
  resumeUrl: "/Geleta-Kebede-Resume.pdf",
  resumeFileName: "Geleta-Kebede-Resume.pdf",

  /**
   * Optional photo. Put a file in /public (for example /public/profile.jpg)
   * and set this to "/profile.jpg". Empty shows the GK monogram instead.
   */
  photoUrl: "/profile.jpg",

  /**
   * Optional: a form endpoint (for example Formspree: https://formspree.io/f/xxxx).
   * If set, the contact form POSTs JSON there. If empty and `email` is set, the
   * form opens the visitor's email app. If both are empty, the form validates
   * and tells the visitor that messaging is not configured yet.
   */
  formEndpoint: "",
} as const;
