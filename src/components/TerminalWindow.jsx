// Mac-style terminal window frame with traffic-light dots.
function TerminalWindow({ title = 'bash', children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-(--radius) border border-line bg-[rgba(var(--panel-rgb),0.88)] shadow-[0_30px_80px_-30px_var(--shadow-deep),0_0_0_1px_rgba(var(--green-rgb),0.04)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-[14px] py-[11px]">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mr-11 flex-1 text-center text-[12px] text-muted">{title}</span>
      </div>
      <div className="px-5 py-[18px] text-[14px] ultra:px-6 ultra:text-[15px] qhd:px-8 qhd:py-6 qhd:text-[17px]">{children}</div>
    </div>
  )
}

export default TerminalWindow
