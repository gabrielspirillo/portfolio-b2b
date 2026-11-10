// Static ember glow + hairline arcs behind the whole page (no animation: zero runtime cost)
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute -right-[20vw] -bottom-[30vh] w-[80vw] h-[80vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.30),rgba(229,65,15,0.10)_55%,transparent)]" />
      <div className="absolute -left-[25vw] -top-[25vh] w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.08),transparent)]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <path d="M980 -20 C 1020 300, 1180 520, 1500 640" stroke="url(#arc)" strokeWidth="1" />
        <path d="M760 920 C 900 640, 1160 560, 1500 520" stroke="url(#arc)" strokeWidth="1" />
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFA27A" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* Fine grain to avoid gradient banding */}
      <div className="absolute inset-0 opacity-[0.025] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
