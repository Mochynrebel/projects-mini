'use client';

import { useState, useCallback, useRef } from 'react';

interface FontCardProps {
  styleId: string;
  styleName: string;
  category: string;
  previewText: string;
  convertedText: string;
  onCopy: (position: { x: number; y: number }) => void;
  animationDelay?: number;
}

export function FontCard({
  styleId,
  styleName,
  category,
  previewText,
  convertedText,
  onCopy,
  animationDelay = 0,
}: FontCardProps) {
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    if (!convertedText) return;

    const rect = previewRef.current?.getBoundingClientRect();
    const position = {
      x: rect ? rect.left + rect.width / 2 : e.clientX,
      y: rect ? rect.top : e.clientY,
    };

    try {
      await navigator.clipboard.writeText(convertedText);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = convertedText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    onCopy(position);
    setTimeout(() => setCopied(false), 1000);
  }, [convertedText, onCopy]);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-pink-500/10"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Category badge */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {category}
        </span>
        {copied && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            已复制
          </span>
        )}
      </div>

      {/* Clickable preview area */}
      <div
        ref={previewRef}
        onClick={handleCopy}
        className={`mb-3 min-h-[60px] cursor-pointer overflow-x-auto rounded-xl p-3 transition-all duration-200 ${
          copied
            ? 'bg-emerald-500/20 ring-1 ring-emerald-500/50'
            : 'bg-black/20 hover:bg-white/5 hover:ring-1 hover:ring-white/10'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCopy(e as unknown as React.MouseEvent);
          }
        }}
      >
        <p className="text-xl leading-relaxed text-white/90 whitespace-nowrap select-none">
          {previewText}
        </p>
      </div>

      {/* Style name */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">
          {styleName}
        </span>
        <span className="text-xs text-zinc-600">
          点击复制
        </span>
      </div>
    </div>
  );
}

// Floating tooltip component for copy feedback
interface CopyTooltipProps {
  show: boolean;
  position: { x: number; y: number };
}

export function CopyTooltip({ show, position }: CopyTooltipProps) {
  if (!show) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none animate-tooltip-fade"
      style={{
        left: position.x,
        top: position.y - 40,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="rounded-full border border-white/20 bg-black/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-xl">
        已复制!
      </div>
    </div>
  );
}
