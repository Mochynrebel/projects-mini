'use client';

export function InFeedAd() {
  return (
    <div className="ad-placeholder col-span-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 p-4 sm:col-span-2 lg:col-span-3">
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </div>
        <p className="text-sm font-medium text-purple-400">Sponsored Content</p>
        <p className="text-xs text-zinc-500">In-Feed Ad • 300 x 250</p>
      </div>
    </div>
  );
}
