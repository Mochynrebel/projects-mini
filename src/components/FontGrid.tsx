'use client';

import { useCallback } from 'react';
import { FontCard } from './FontCard';
import { fontStyles, convertText } from '@/lib/fonts';

interface FontGridProps {
  inputText: string;
  visibleCount: number;
  onCopy: (position: { x: number; y: number }) => void;
}

export function FontGrid({ inputText, visibleCount, onCopy }: FontGridProps) {
  const handleCopy = useCallback((position: { x: number; y: number }) => {
    onCopy(position);
  }, [onCopy]);

  const displayText = inputText.trim() || '';
  const visibleStyles = fontStyles.slice(0, visibleCount);

  // Insert ad-infeed after 6th style when there are 12+ styles
  const insertAdIndex = 6;
  const showAdInfeed = visibleCount >= 12;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {visibleStyles.map((style, index) => {
        // Insert ad card after 6th item
        if (index === insertAdIndex && showAdInfeed) {
          return (
            <div key={`ad-wrapper-${index}`} className="col-span-full">
              <div
                id="ad-infeed"
                className="flex h-[100px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="text-center">
                  <p className="text-xs text-zinc-500">Advertisement</p>
                  <p className="text-sm font-medium text-zinc-600">ad-infeed</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={style.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}
          >
            <FontCard
              styleId={style.id}
              styleName={style.name}
              category={style.category}
              previewText={displayText || '点击复制文字'}
              convertedText={displayText}
              onCopy={handleCopy}
              animationDelay={0}
            />
          </div>
        );
      })}
    </div>
  );
}
