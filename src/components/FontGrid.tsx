'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { FontCard } from './FontCard';
import { fontStyles, convertText } from '@/lib/fonts';

interface FontGridProps {
  inputText: string;
  onCopy: (text: string, position: { x: number; y: number }) => void;
  onCountChange: (shown: number, total: number) => void;
}

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 8;

export function FontGrid({ inputText, onCopy, onCountChange }: FontGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const totalStyles = fontStyles.length;

  const handleCopy = useCallback((text: string, event: React.MouseEvent) => {
    // Get click position for tooltip
    const position = {
      x: event.clientX,
      y: event.clientY,
    };
    onCopy(text, position);
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
        {fontStyles.slice(0, visibleCount).map((fontStyle, index) => (
          <FontCard
            key={fontStyle.id}
            fontStyle={fontStyle}
            convertedText={convertText(inputText, fontStyle.id)}
            onCopy={handleCopy}
            index={index}
          />
        ))}
      </div>

      {/* Load More Button */}
      {!isAllLoaded && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="gradient-button flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40"
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
