import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FaCheck, FaCopy } from 'react-icons/fa6'
import { profile, socials } from '../data'
import { socialIcons } from '../lib/icons'
import SectionHeading from '../components/SectionHeading'
import TerminalWindow from '../components/TerminalWindow'
import MagneticButton from '../components/MagneticButton'
import { usePageTitle } from '../lib/hooks'
import { isEmailConfigured, openMailto, sendContactEmail } from '../lib/email'

const FIELDS = [
  { name: 'name', label: 'name', type: 'text', placeholder: 'John Doe' },
  { name: 'email', label: 'email', type: 'email', placeholder: 'john@company.com' },
  { name: 'message', label: 'message', type: 'textarea', placeholder: "Let's build something awesome…" },
]

const inputClass =
  'w-full resize-y rounded-lg border border-line bg-[rgba(var(--bg-rgb),0.6)] px-[14px] py-3 text-fg caret-green outline-none [transition:border-color_0.25s,box-shadow_0.25s] placeholder:text-(--faint) focus:border-green focus:shadow-[0_0_0_3px_rgba(var(--green-rgb),0.12),var(--glow-green)]'

function ContactPage() {
  usePageTitle('Contact')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      if (isEmailConfigured) {
        await sendContactEmail(form) // real email via EmailJS
      } else {
        await new Promise((r) => setTimeout(r, 1200))
        openMailto(form) // no EmailJS keys yet: open the visitor's mail app
      }
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="page">
      <SectionHeading
        index="04"
        title="Get In Touch"
        subtitle="Have a project, a role, or just want to say hi? My inbox is always open."
      />

      <div className="grid grid-cols-[1.5fr_1fr] items-start gap-10 max-lap:grid-cols-[1.3fr_1fr] max-tab:grid-cols-1 max-phone:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TerminalWindow title="~/contact — new_message.sh">
            <form onSubmit={onSubmit}>
              {FIELDS.map((f) => (
                <label key={f.name} className="mb-5 block">
                  <span className="mb-[6px] block text-[13px] text-muted">
                    <span className="text-green">❯</span> {f.label}:
                  </span>
                  {f.type === 'textarea' ? (
                    <textarea
                      className={inputClass}
                      name={f.name}
                      rows={5}
                      required
                      value={form[f.name]}
                      onChange={onChange}
                      placeholder={f.placeholder}
                    />
                  ) : (
                    <input
                      className={inputClass}
                      name={f.name}
                      type={f.type}
                      required
                      value={form[f.name]}
                      onChange={onChange}
                      placeholder={f.placeholder}
                    />
                  )}
                </label>
              ))}

              <div className="flex flex-wrap items-center gap-[18px]">
                <MagneticButton>
                  <button type="submit" className="btn disabled:cursor-progress disabled:opacity-60" disabled={status === 'sending'}>
                    {status === 'sending' ? 'executing…' : './send_message.sh'}
                  </button>
                </MagneticButton>

                <AnimatePresence mode="wait">
                  {status === 'sending' && (
                    <motion.span
                      key="sending"
                      className="inline-flex items-center gap-2 text-[13px] text-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="spinner" /> establishing connection…
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span
                      key="sent"
                      className="inline-flex items-center gap-2 text-[13px] text-green"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <FaCheck /> {isEmailConfigured ? 'message delivered' : 'opening your mail app'} — exit 0
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span
                      key="error"
                      className="inline-flex items-center gap-2 text-[13px] text-magenta"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✖ send failed — exit 1. please email me directly →
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </TerminalWindow>
        </motion.div>

        <motion.aside
          className="flex flex-col gap-3 pt-2.5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <p className="text-muted">// prefer email?</p>
          <button className="flex items-center justify-between gap-3 rounded-[10px] border border-line bg-panel px-[18px] py-4 text-left text-[15px] break-all max-xs:px-3.5 max-xs:text-[13px] [transition:border-color_0.2s,color_0.2s] hover:border-cyan hover:text-cyan" onClick={copyEmail} data-cursor="hover">
            <span>{profile.email}</span>
            {copied ? <FaCheck className="text-green" /> : <FaCopy />}
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                className="text-[12px] text-green"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                copied to clipboard ✔
              </motion.span>
            )}
          </AnimatePresence>

          <p className="mt-5 text-muted">// or find me on</p>
          <div className="flex flex-col">
            {socials.map((s, i) => {
              const Icon = socialIcons[s.icon]
              return (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 border-b border-dashed border-line px-1 py-[14px] text-[15px] [transition:color_0.2s] hover:text-green"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  whileHover={{ x: 8 }}
                >
                  {Icon && <Icon />} {s.label}
                  <span className="ml-auto opacity-0 [transition:opacity_0.2s] group-hover:opacity-100">→</span>
                </motion.a>
              )
            })}
          </div>
        </motion.aside>
      </div>
    </div>
  )
}

export default ContactPage
