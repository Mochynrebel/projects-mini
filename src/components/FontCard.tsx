'use client';

import { useState, useRef } from 'react';
import { Copy } from 'lucide-react';
import type { FontStyle } from '@/lib/fonts';

interface FontCardProps {
  fontStyle: FontStyle;
  convertedText: string;
  onCopy: (text: string, event: React.MouseEvent) => void;
  index: number;
}

export function FontCard({ fontStyle, convertedText, onCopy, index }: FontCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    onCopy(convertedText, e);
  };

  const displayText = convertedText || 'Your text here...';

  return (
    <div
      ref={cardRef}
      className="animate-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1a1a1a] p-4 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Style Name Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
              {fontStyle.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="text-sm font-medium text-[#f0f0f0]">
              {fontStyle.name}
            </span>
          </div>
          
          {/* Hint indicator */}
          <div
            className={`flex items-center gap-1 text-xs text-zinc-500 transition-all duration-200 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
          >
            <Copy className="h-3 w-3" />
            <span>Click to copy</span>
          </div>
        </div>

        {/* Clickable Text Preview */}
        <div
          onClick={handleClick}
          className={`relative mb-2 min-h-[50px] cursor-pointer overflow-x-auto rounded-xl px-4 py-3 transition-all duration-200 ${
            isHovered 
              ? 'bg-[#252525] ring-2 ring-purple-500/30' 
              : 'bg-[#141414]'
          }`}
        >
          <p className="text-xl leading-relaxed text-[#f0f0f0] whitespace-nowrap">
            {displayText}
          </p>
        </div>

        {/* Hover overlay with copy hint */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl transition-all duration-200 ${
            isHovered 
              ? 'bg-black/50 opacity-100' 
              : 'bg-black/0 opacity-0'
          }`}
        >
          <div className={`flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-purple-500/30 transition-all duration-200 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}>
            <Copy className="h-4 w-4" />
            <span>Click to Copy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
