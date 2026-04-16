'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { FontCard } from './FontCard';
import { InFeedAd } from './InFeedAd';
import { AdBanner } from './AdBanner';
import { fontStyles } from '@/lib/fonts';

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 8;

interface FontGridProps {
  inputText: string;
  onCopy: () => void;
  onCountChange: (shown: number, total: number) => void;
}

export function FontGrid({ inputText, onCopy, onCountChange }: FontGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Notify parent of count changes
  useEffect(() => {
    onCountChange(visibleCount, fontStyles.length);
  }, [visibleCount, onCountChange]);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate a brief loading state for smooth transition
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, fontStyles.length));
      setIsLoading(false);
    }, 300);
  }, []);

  const visibleStyles = fontStyles.slice(0, visibleCount);
  const hasMore = visibleCount < fontStyles.length;

  // Check if we should show in-feed ad (after loading at least 12 items)
  const showInFeedAd = visibleCount >= INITIAL_COUNT && hasMore;

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {/* Font Grid with In-Feed Ad */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStyles.map((style, index) => (
          <div key={style.id}>
            {/* Insert in-feed ad after the 6th card when showing ads */}
            {showInFeedAd && index === 6 && (
              <div className="mb-4">
                <InFeedAd />
              </div>
            )}
            <FontCard
              style={style}
              text={inputText}
              onCopy={onCopy}
              delay={index * 30}
            />
          </div>
        ))}
      </div>

      {/* Bottom Ad */}
      {visibleCount >= fontStyles.length && (
        <div className="mt-8">
          <AdBanner id="ad-bottom" size="rectangle" className="hidden sm:block" />
        </div>
      )}

      {/* Load More Button */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-medium text-purple-400 transition-all duration-200 hover:bg-purple-500/20 hover:text-purple-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Load More Styles</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-medium text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>All styles loaded ({fontStyles.length} styles)</span>
          </div>
        )}

        <p className="text-xs text-zinc-500">
          Showing {visibleCount} of {fontStyles.length} styles
        </p>
      </div>
    </div>
  );
}
