'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

interface FontCardProps {
  styleId: string;
  styleName: string;
  category: string;
  previewText: string;
  convertedText: string;
  onCopy: () => void;
}

export function FontCard({ styleId, styleName, category, previewText, convertedText, onCopy }: FontCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!convertedText) return;

    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 1000);
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
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 1000);
    }
  }, [convertedText, onCopy]);

  return (
    <div className="glass-card group relative overflow-hidden rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
            {category}
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-sm font-medium text-[#f0f0f0]">
            {styleName}
          </span>
        </div>
      </div>

      <div className="mb-4 min-h-[50px] overflow-x-auto">
        <p className="text-xl leading-relaxed text-[#f0f0f0] whitespace-nowrap">
          {previewText}
        </p>
      </div>

      <button
        onClick={handleCopy}
        disabled={!convertedText}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition-all duration-200 ${
          copied
            ? 'bg-emerald-500 text-white'
            : 'gradient-button text-white'
        } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
