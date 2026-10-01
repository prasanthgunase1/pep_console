import { profile } from '../data'

// Animated "hologram developer" illustration.
// Set `photo` in data.js (e.g. '/me.jpg' in /public) to show your real photo instead.
function DevAvatar() {
  return (
    <div className="flex flex-col items-center gap-[18px]">
      <div className="dav-frame relative aspect-square w-[min(340px,78vw)] max-xs:w-[min(260px,80vw)] ultra:w-[400px] qhd:w-[480px] overflow-hidden rounded-[22px]">
        {profile.photo ? (
          <img className="h-full w-full object-cover [filter:saturate(0.9)_contrast(1.05)]" src={profile.photo} alt={profile.name} />
        ) : (
          <svg className="dav-svg" viewBox="0 0 300 300" role="img" aria-label={`${profile.name} coding`}>
            {/* orbit rings */}
            <g className="dav-orbit">
              <circle cx="150" cy="150" r="132" className="dav-ring" />
              <circle cx="150" cy="18" r="4" className="dav-orbit-dot" />
            </g>
            <g className="dav-orbit dav-orbit--rev">
              <circle cx="150" cy="150" r="112" className="dav-ring dav-ring--alt" />
              <circle cx="38" cy="150" r="3" className="dav-orbit-dot dav-orbit-dot--alt" />
            </g>

            {/* floating hologram code panel */}
            <g className="dav-panel">
              <rect x="22" y="44" width="96" height="70" rx="6" className="dav-panel-bg" />
              <circle cx="31" cy="53" r="2.5" fill="#ff5f57" />
              <circle cx="39" cy="53" r="2.5" fill="#febc2e" />
              <circle cx="47" cy="53" r="2.5" fill="#28c840" />
              <rect x="30" y="64" width="44" height="4" rx="2" className="dav-code dav-code--1" />
              <rect x="38" y="73" width="62" height="4" rx="2" className="dav-code dav-code--2" />
              <rect x="38" y="82" width="36" height="4" rx="2" className="dav-code dav-code--3" />
              <rect x="30" y="91" width="54" height="4" rx="2" className="dav-code dav-code--4" />
              <rect x="30" y="100" width="28" height="4" rx="2" className="dav-code dav-code--5" />
            </g>

            {/* floating symbols */}
            <text x="232" y="72" className="dav-sym">{'{ }'}</text>
            <text x="246" y="132" className="dav-sym dav-sym--2">=&gt;</text>
            <text x="30" y="160" className="dav-sym dav-sym--3">( )</text>

            {/* developer */}
            <g className="dav-dev">
              {/* body / hoodie */}
              <path d="M88 236 Q88 168 150 160 Q212 168 212 236 Z" className="dav-body" />
              <path d="M134 164 L150 186 L166 164" className="dav-line" />
              <line x1="143" y1="176" x2="141" y2="196" className="dav-line" />
              <line x1="157" y1="176" x2="159" y2="196" className="dav-line" />
              {/* neck */}
              <rect x="142" y="142" width="16" height="20" rx="4" className="dav-skin" />
              {/* head */}
              <circle cx="150" cy="112" r="34" className="dav-skin" />
              {/* hair */}
              <path d="M115 112 Q113 72 150 72 Q188 72 186 110 Q178 90 156 92 Q140 86 128 96 Q119 102 115 112 Z" className="dav-hair" />
              {/* headphones */}
              <path d="M110 114 A40 40 0 0 1 190 114" className="dav-phones" />
              <rect x="104" y="104" width="11" height="24" rx="5" className="dav-cup" />
              <rect x="185" y="104" width="11" height="24" rx="5" className="dav-cup" />
              {/* glasses */}
              <rect x="126" y="106" width="20" height="14" rx="4" className="dav-glass" />
              <rect x="154" y="106" width="20" height="14" rx="4" className="dav-glass" />
              <line x1="146" y1="112" x2="154" y2="112" className="dav-line" />
              <line x1="129" y1="109" x2="134" y2="109" className="dav-glint" />
              <line x1="157" y1="109" x2="162" y2="109" className="dav-glint" />
              {/* eyes */}
              <g className="dav-eyes">
                <circle cx="136" cy="114" r="2.4" />
                <circle cx="164" cy="114" r="2.4" />
              </g>
              {/* smile */}
              <path d="M140 130 Q150 138 160 130" className="dav-line" />
            </g>

            {/* desk + laptop */}
            <line x1="36" y1="250" x2="264" y2="250" className="dav-desk" />
            <path d="M100 182 L200 182 L206 244 L94 244 Z" className="dav-laptop" />
            <text x="150" y="220" textAnchor="middle" className="dav-logo">&lt;/&gt;</text>
            <rect x="80" y="244" width="140" height="6" rx="3" className="dav-base" />

            {/* coffee */}
            <rect x="226" y="220" width="22" height="28" rx="4" className="dav-mug" />
            <path d="M248 226 q10 0 10 9 q0 9 -10 9" className="dav-line" />
            <path d="M232 214 q-5 -8 0 -16 q5 -8 0 -16" className="dav-steam" />
            <path d="M241 214 q-5 -8 0 -16 q5 -8 0 -16" className="dav-steam dav-steam--2" />

            {/* hologram scan */}
            <rect x="0" y="0" width="300" height="3" className="dav-scan" />
          </svg>
        )}
        <div className="dav-scanlines pointer-events-none absolute inset-0" />
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-[14px] py-[6px] text-[12px] text-muted">
        <span className="h-2 w-2 animate-[blink_1.4s_infinite] rounded-full bg-green shadow-[0_0_8px_var(--green)]" /> {profile.handle}.exe — <span className="text-green">compiling ideas…</span>
      </div>
    </div>
  )
}

export default DevAvatar
