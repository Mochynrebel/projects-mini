'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface FontCardProps {
  styleId: string;
  styleName: string;
  convertedText: string;
  isSelected: boolean;
  isCopied: boolean;
  onCopyStyle: (styleId: string) => void;
}

export default function FontCard({
  styleId,
  styleName,
  convertedText,
  isSelected,
  isCopied,
  onCopyStyle,
}: FontCardProps) {
  const handleClick = useCallback(() => {
    onCopyStyle(styleId);
  }, [onCopyStyle, styleId]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onCopyStyle(styleId);
      }
    },
    [onCopyStyle, styleId]
  );

  return (
    <div
      id={`font-card-${styleId}`}
      className={cn(
        'group relative cursor-pointer rounded-2xl border bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300',
        'hover:scale-[1.02] hover:bg-white/[0.06] hover:border-white/[0.15]',
        isSelected
          ? 'border-pink-400/60 bg-pink-500/10 ring-1 ring-pink-400/40 shadow-lg shadow-pink-500/10'
          : 'border-white/[0.08]',
        isCopied && 'shadow-lg shadow-orange-500/10'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Copy ${styleName} style: ${convertedText}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="text-xs font-medium uppercase tracking-wider text-white/40">
          {styleName}
        </div>
        {isCopied ? (
          <span className="rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Copied!
          </span>
        ) : null}
      </div>

      <div className="flex min-h-[64px] items-center justify-center">
        <p
          className="text-center text-xl leading-relaxed text-white transition-transform duration-200 group-hover:scale-[1.02] sm:text-2xl"
          style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
        >
          {convertedText || 'Type text above...'}
        </p>
      </div>

      <div className="absolute bottom-2 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="text-xs text-white/30">tap to copy</span>
      </div>
    </div>
  );
}
