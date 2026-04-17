'use client';

import { useState, useCallback, useRef } from 'react';

interface FontCardProps {
  styleName: string;
  convertedText: string;
  onCopy: (text: string, event: React.MouseEvent) => void;
}

export default function FontCard({ styleName, convertedText, onCopy }: FontCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      onCopy(convertedText, e);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
    },
    [convertedText, onCopy]
  );

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15] hover:scale-[1.02] cursor-pointer"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
onKeyDown={(e) => {
  // 只保留了 Enter 键（为了网页的无障碍标准），删掉了空格键触发
  if (e.key === 'Enter') {
    // 补全了 <HTMLDivElement> 类型，解决 TypeScript 报错
    handleCopy(e as unknown as React.MouseEvent<HTMLDivElement>);
  }
}}
      aria-label={`Copy ${styleName} style: ${convertedText}`}
    >
      {/* Style Name */}
      <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
        {styleName}
      </div>

      {/* Converted Text Preview - Clickable */}
      <div className="min-h-[48px] flex items-center justify-center">
        <p
          className="text-xl sm:text-2xl text-white text-center leading-relaxed break-all select-none transition-transform duration-200 group-hover:scale-[1.02]"
          style={{ wordBreak: 'break-word' }}
        >
          {convertedText || 'Type text above...'}
        </p>
      </div>

      {/* Click Hint */}
      <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs text-white/30">tap to copy</span>
      </div>

      {/* Tooltip - Shows on click */}
      {showTooltip && (
        <div
          className="fixed z-50 pointer-events-none animate-fade-in-out"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 40}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
            已复制!
          </div>
        </div>
      )}
    </div>
  );
}
