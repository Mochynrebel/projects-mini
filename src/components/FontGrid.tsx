'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { FontCard } from './FontCard';
import { fontStyles, convertText } from '@/lib/fonts';

interface FontGridProps {
  inputText: string;
  onCopy: () => void;
  onCountChange: (shown: number, total: number) => void;
}

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 8;

export function FontGrid({ inputText, onCopy, onCountChange }: FontGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const totalStyles = fontStyles.length;

  const handleCopy = useCallback(() => {
    onCopy();
  }, [onCopy]);

  const handleLoadMore = useCallback(() => {
    const newCount = Math.min(visibleCount + LOAD_MORE_COUNT, totalStyles);
    setVisibleCount(newCount);
    onCountChange(newCount, totalStyles);
  }, [visibleCount, totalStyles, onCountChange]);

  const isAllLoaded = visibleCount >= totalStyles;

  // Update parent with initial count
  useEffect(() => {
    onCountChange(visibleCount, totalStyles);
  }, [visibleCount, totalStyles, onCountChange]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fontStyles.slice(0, visibleCount).map((style, index) => (
          <div
            key={style.id}
            className="animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}
          >
            <FontCard
              styleId={style.id}
              styleName={style.name}
              category={style.category}
              previewText={convertText(inputText || 'Your text here...', style.id)}
              convertedText={convertText(inputText, style.id)}
              onCopy={handleCopy}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {!isAllLoaded && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="gradient-button flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all duration-200"
          >
            <ChevronDown className="h-5 w-5" />
            <span>Load More Styles</span>
          </button>
        </div>
      )}

      {/* All Loaded Indicator */}
      {isAllLoaded && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 px-6 py-3 text-sm font-medium text-emerald-400">
            <Check className="h-4 w-4" />
            <span>All styles loaded ({totalStyles} styles)</span>
          </div>
        </div>
      )}
    </div>
  );
}
