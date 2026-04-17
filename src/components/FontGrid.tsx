'use client';

import { useState, useMemo, useCallback } from 'react';
import { fontStyles, convertText, FontStyleDef } from '@/lib/fonts';
import FontCard from './FontCard';

interface FontGridProps {
  inputText: string;
  onCopy: (text: string, event: React.MouseEvent) => void;
}

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 5;

export default function FontGrid({ inputText, onCopy }: FontGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  // Calculate converted texts
  const convertedTexts = useMemo(() => {
    const texts: Record<string, string> = {};
    fontStyles.forEach((style) => {
      texts[style.id] = convertText(inputText, style.mapping);
    });
    return texts;
  }, [inputText]);

  // Get visible styles
  const visibleStyles = useMemo(() => {
    return fontStyles.slice(0, visibleCount);
  }, [visibleCount]);

  // Determine if we should show ad-infeed
  const showAdInfeed = visibleCount >= 12 && !hasLoadedMore;

  // Get items to render with ad placement
  const renderItems = useMemo(() => {
    const items: (FontStyleDef | { type: 'ad'; id: string })[] = [];
    let adInserted = false;

    visibleStyles.forEach((style, index) => {
      // Insert ad after 6th item (between 6 and 7)
      if (showAdInfeed && index === 6 && !adInserted) {
        items.push({ type: 'ad', id: 'ad-infeed' });
        adInserted = true;
      }
      items.push(style);
    });

    return items;
  }, [visibleStyles, showAdInfeed]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
    setHasLoadedMore(true);
  }, []);

  const hasMore = visibleCount < fontStyles.length;

  return (
    <div className="space-y-6">
      {/* Font Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderItems.map((item) => {
          if ('type' in item && item.type === 'ad') {
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-white/[0.02] border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="text-white/40 text-sm font-medium mb-2">Advertisement</div>
                <div className="text-white/20 text-xs">728x90 / Responsive</div>
              </div>
            );
          }

          const style = item as FontStyleDef;
          return (
            <FontCard
              key={style.id}
              styleName={style.name}
              convertedText={convertedTexts[style.id] || ''}
              onCopy={onCopy}
            />
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] rounded-full text-white/70 hover:text-white transition-all duration-300 font-medium"
          >
            Load More ({Math.min(LOAD_MORE_COUNT, fontStyles.length - visibleCount)} of {fontStyles.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
