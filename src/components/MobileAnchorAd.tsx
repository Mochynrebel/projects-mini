'use client';

export function MobileAnchorAd() {
  return (
    <div
      id="ad-mobile-anchor"
      className="ad-placeholder fixed bottom-0 left-0 right-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-lg border-t border-purple-500/30 p-2"
    >
      <div className="flex h-[50px] w-full max-w-[320px] items-center justify-center rounded-lg border-2 border-dashed border-purple-500/30 bg-purple-500/5">
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-medium text-purple-400">Mobile Ad</p>
          <p className="text-[10px] text-zinc-500">320 x 50 Anchor</p>
        </div>
      </div>
    </div>
  );
}
