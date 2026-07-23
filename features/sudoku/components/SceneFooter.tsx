/** Decorative rolling-hill footer — matches Picture Sudoku game mockup. */
export function SceneFooter() {
  return (
    <div
      className="pointer-events-none relative -mx-4 mt-auto h-28 w-[calc(100%+2rem)] shrink-0 overflow-hidden sm:-mx-5 sm:h-32 sm:w-[calc(100%+2.5rem)]"
      aria-hidden
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full"
        viewBox="0 0 440 128"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C5E88A" />
            <stop offset="100%" stopColor="#A8D48A" />
          </linearGradient>
          <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8FD45A" />
            <stop offset="40%" stopColor="#65B741" />
            <stop offset="100%" stopColor="#4F9A32" />
          </linearGradient>
        </defs>

        {/* Back hill — lighter lime, rises higher on sides */}
        <path
          fill="url(#hill-back)"
          d="M0 128
             L0 58
             C40 42, 70 36, 110 48
             C150 60, 180 72, 230 58
             C280 44, 320 34, 370 42
             C400 48, 420 56, 440 62
             L440 128 Z"
        />

        {/* Front hill — deeper green, soft dip in center */}
        <path
          fill="url(#hill-front)"
          d="M0 128
             L0 78
             C35 62, 75 54, 115 64
             C155 74, 185 88, 225 78
             C265 68, 300 56, 345 62
             C385 68, 415 78, 440 84
             L440 128 Z"
        />

        {/* Soft crest highlight on front hill */}
        <path
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="3"
          strokeLinecap="round"
          d="M8 78
             C40 64, 75 56, 115 66
             C155 76, 185 90, 225 80
             C265 70, 300 58, 345 64
             C385 70, 415 80, 432 86"
        />
      </svg>

      {/* Grass tufts along the front crest */}
      <GrassTuft className="absolute bottom-[3.6rem] left-[7%] sm:bottom-16" />
      <GrassTuft className="absolute bottom-[3.1rem] left-[20%] sm:bottom-14" />
      <GrassTuft className="absolute bottom-[3.4rem] left-[46%] sm:bottom-[3.75rem]" />
      <GrassTuft className="absolute bottom-[2.9rem] right-[30%] sm:bottom-13" />
      <GrassTuft className="absolute bottom-[3.5rem] right-[11%] sm:bottom-16" />
      <GrassTuft className="absolute bottom-[3.2rem] left-[68%] sm:bottom-[3.5rem]" />

      {/* Petal flowers sitting on the hills */}
      <Flower className="absolute bottom-[3.9rem] left-[11%] sm:bottom-[4.4rem]" petal="#FFFDF5" center="#FBBF24" size={12} />
      <Flower className="absolute bottom-[4.5rem] left-[24%] sm:bottom-20" petal="#FDE68A" center="#F59E0B" size={14} />
      <Flower className="absolute bottom-[3.7rem] left-[38%] sm:bottom-16" petal="#FECACA" center="#EF4444" size={11} />
      <Flower className="absolute bottom-[4.2rem] left-[55%] sm:bottom-[4.6rem]" petal="#FFFDF5" center="#FCD34D" size={13} />
      <Flower className="absolute bottom-[3.55rem] right-[28%] sm:bottom-[3.9rem]" petal="#FEE2E2" center="#F87171" size={12} />
      <Flower className="absolute bottom-[4.35rem] right-[16%] sm:bottom-[4.8rem]" petal="#FEF3C7" center="#F59E0B" size={11} />
      <Flower className="absolute bottom-[3.85rem] right-[6%] sm:bottom-[4.25rem]" petal="#FFF" center="#FBBF24" size={10} />
    </div>
  );
}

function GrassTuft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 12 C2.8 7.5, 1.2 4, 2.2 1.2"
        stroke="#3F8A28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12 C8 7.5, 7.2 3.5, 8.2 0.8"
        stroke="#3F8A28"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12.5 12 C13.2 7.5, 14.5 4, 13.2 1.2"
        stroke="#3F8A28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Flower({
  className,
  petal,
  center,
  size = 12,
}: {
  className?: string;
  petal: string;
  center: string;
  size?: number;
}) {
  const r = size / 2;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
    >
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const cx = r + Math.cos(rad) * (r * 0.34);
        const cy = r + Math.sin(rad) * (r * 0.34);
        return <circle key={deg} cx={cx} cy={cy} r={r * 0.36} fill={petal} />;
      })}
      <circle cx={r} cy={r} r={r * 0.3} fill={center} />
    </svg>
  );
}
