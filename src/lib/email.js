import emailjs from '@emailjs/browser'
import { profile } from '../data'

// EmailJS keys come from `.env.local` (see `.env.example`). They are public-safe by design.
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export const isEmailConfigured = Boolean(config.serviceId && config.templateId && config.publicKey)

// Sends the contact form through EmailJS.
// Template variables: {{from_name}}, {{from_email}}, {{reply_to}}, {{message}}, {{to_name}}
export function sendContactEmail({ name, email, message }) {
  return emailjs.send(
    config.serviceId,
    config.templateId,
    { from_name: name, from_email: email, reply_to: email, message, to_name: profile.firstName },
    { publicKey: config.publicKey },
  )
}

// Fallback when EmailJS isn't configured (or fails): open the visitor's mail app.
export function openMailto({ name, email, message }) {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`)
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}
