import { useTypewriter } from '../lib/hooks'

function TypingText({ words, className = '' }) {
  const text = useTypewriter(words)
  return <span className={`blink-cursor ${className}`}>{text}</span>
}

export default TypingText
