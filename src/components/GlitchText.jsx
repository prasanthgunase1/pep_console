// RGB-split glitch effect (styles: .glitch in index.css)
function GlitchText({ text, as: Tag = 'span', className = '', children }) {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {children ?? text}
    </Tag>
  )
}

export default GlitchText
