'use client';

import { useMemo } from 'react';
import { convertText, fontStyles, type FontStyleDef } from '@/lib/fonts';
import FontCard from './FontCard';

interface FontGridProps {
  inputText: string;
  visibleCount: number;
  selectedStyleId: string | null;
  copiedStyleId: string | null;
  onCopyStyle: (styleId: string) => void;
  onLoadMore: () => void;
}

const LOAD_MORE_COUNT = 6;

export default function FontGrid({
  inputText,
  visibleCount,
  selectedStyleId,
  copiedStyleId,
  onCopyStyle,
  onLoadMore,
}: FontGridProps) {
  const convertedTexts = useMemo(() => {
    const texts: Record<string, string> = {};

    for (const style of fontStyles) {
      texts[style.id] = convertText(inputText, style.mapping);
    }

    return texts;
  }, [inputText]);

  const visibleStyles = useMemo(() => fontStyles.slice(0, visibleCount), [visibleCount]);
  const showAdInfeed = visibleCount >= 12;

  const renderItems = useMemo(() => {
    const items: Array<FontStyleDef | { type: 'ad'; id: string }> = [];

    visibleStyles.forEach((style, index) => {
      if (showAdInfeed && index === 6) {
        items.push({ type: 'ad', id: 'ad-infeed' });
      }

      items.push(style);
    });

    return items;
  }, [showAdInfeed, visibleStyles]);

  const remainingCount = Math.max(fontStyles.length - visibleCount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderItems.map((item) => {
          if ('type' in item) {
            return (
              <div
                key={item.id}
                id={item.id}
                className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/[0.1] bg-white/[0.02] p-8"
              >
                <div className="mb-2 text-sm font-medium text-white/40">Advertisement</div>
                <div className="text-xs text-white/20">728x90 / Responsive</div>
              </div>
            );
          }

          return (
            <FontCard
              key={item.id}
              styleId={item.id}
              styleName={item.name}
              convertedText={convertedTexts[item.id] ?? ''}
              isSelected={selectedStyleId === item.id}
              isCopied={copiedStyleId === item.id}
              onCopyStyle={onCopyStyle}
            />
          );
        })}
      </div>

      {remainingCount > 0 ? (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={onLoadMore}
            className="rounded-full border border-white/[0.1] bg-white/[0.05] px-8 py-3 font-medium text-white/70 transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.1] hover:text-white"
          >
            Load More ({Math.min(LOAD_MORE_COUNT, remainingCount)} of {remainingCount} remaining)
          </button>
        </div>
      ) : null}
    </div>
  );
}
