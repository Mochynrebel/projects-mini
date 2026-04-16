'use client';

interface AdBannerProps {
  id: string;
  size?: 'leaderboard' | 'rectangle' | 'mobile';
  className?: string;
}

export function AdBanner({ id, size = 'leaderboard', className = '' }: AdBannerProps) {
  const sizeClasses = {
    leaderboard: 'min-h-[90px] w-full max-w-[728px]',
    rectangle: 'min-h-[250px] w-full max-w-[300px]',
    mobile: 'h-[50px] w-full max-w-[320px]',
  };

  return (
    <div
      id={id}
      className={`ad-placeholder mx-auto flex items-center justify-center rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 text-center ${sizeClasses[size]} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 p-4">
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
        <p className="text-sm font-medium text-purple-400">Ad Placement</p>
        <p className="text-xs text-zinc-500">
          {size === 'leaderboard' && '728 x 90 Leaderboard'}
          {size === 'rectangle' && '300 x 250 Rectangle'}
          {size === 'mobile' && '320 x 50 Mobile Anchor'}
        </p>
      </div>
    </div>
  );
}
