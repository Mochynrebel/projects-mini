'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

interface FontCardProps {
  styleId: string;
  styleName: string;
  previewText: string;
  convertedText: string;
  onCopy: () => void;
}

export function FontCard({ styleId, styleName, previewText, convertedText, onCopy }: FontCardProps) {
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-pink-500/10">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          {styleName}
        </span>
        <span className="h-2 w-2 rounded-full bg-emerald-500/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>

      <div className="mb-4 min-h-[60px] overflow-x-auto">
        <p className="text-xl leading-relaxed text-white/90 whitespace-nowrap">
          {previewText}
        </p>
      </div>

      <button
        onClick={handleCopy}
        disabled={!convertedText}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-200 ${
          copied
            ? 'bg-emerald-500 text-white'
            : 'bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]'
        } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
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
