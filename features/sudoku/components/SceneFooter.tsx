export function SceneFooter() {
  return (
    <div className="relative mt-auto h-20 w-full shrink-0 overflow-hidden" aria-hidden>
      <div className="absolute bottom-0 left-[-10%] h-14 w-[120%] rounded-[100%] bg-emerald-400/70" />
      <div className="absolute bottom-0 left-[-5%] h-10 w-[110%] rounded-[100%] bg-emerald-500/80" />

      <span className="absolute bottom-8 left-[15%] text-xs text-yellow-200">✿</span>
      <span className="absolute bottom-10 left-[28%] text-sm text-white">✿</span>
      <span className="absolute bottom-7 right-[20%] text-xs text-yellow-100">✿</span>
      <span className="absolute bottom-9 right-[32%] text-sm text-white/90">✿</span>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div className="h-3 w-5 rounded-sm bg-amber-700/80" />
        <div className="relative -mt-0.5">
          <span className="text-lg">🌱</span>
        </div>
      </div>
    </div>
  );
}
