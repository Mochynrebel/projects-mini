'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { TextInput } from '@/components/TextInput';
import { FontGrid } from '@/components/FontGrid';
import { HowToSection } from '@/components/HowToSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { fontStyles } from '@/lib/fonts';

const INITIAL_DISPLAY_COUNT = 12;
const LOAD_MORE_COUNT = 8;

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);
  const [tooltip, setTooltip] = useState<{ show: boolean; position: { x: number; y: number } }>({
    show: false,
    position: { x: 0, y: 0 },
  });

  const handleCopy = useCallback((position: { x: number; y: number }) => {
    setTooltip({ show: true, position });
    setTimeout(() => {
      setTooltip((prev) => ({ ...prev, show: false }));
    }, 1000);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, fontStyles.length));
  }, []);

  const hasMoreStyles = visibleCount < fontStyles.length;

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 sm:pb-0">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-pink fixed -left-40 -top-40 h-96 w-96" />
      <div className="gradient-orb gradient-orb-orange fixed -bottom-40 -right-40 h-96 w-96" />
      <div className="gradient-orb gradient-orb-pink fixed left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-3xl px-4 py-10">
          {/* Top Banner Ad */}
          <div
            id="ad-top"
            className="mb-8 flex h-[90px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <div className="text-center">
              <p className="text-xs text-zinc-500">Advertisement</p>
              <p className="text-sm font-medium text-zinc-600">ad-top (728x90)</p>
            </div>
          </div>

          {/* Hero Section */}
          <section className="mb-12 text-center">
            <p className="mb-6 text-sm text-zinc-400 sm:text-base">
              Transform your text into 50+ unique font styles. Click any style to copy instantly.
            </p>
            <TextInput value={inputText} onChange={setInputText} />
          </section>

          {/* Font Grid */}
          <section className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Font Styles</h2>
              <span className="text-xs text-zinc-500">{fontStyles.length} styles available</span>
            </div>
            <FontGrid
              inputText={inputText}
              visibleCount={visibleCount}
              onCopy={handleCopy}
            />
          </section>

          {/* Load More Button */}
          {hasMoreStyles && (
            <div className="mb-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20"
              >
                Load More ({Math.min(LOAD_MORE_COUNT, fontStyles.length - visibleCount)} more styles)
              </button>
            </div>
          )}

          {/* Bottom Ad */}
          <div
            id="ad-bottom"
            className="mb-8 flex h-[250px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-xl sm:h-[90px]"
          >
            <div className="text-center">
              <p className="text-xs text-zinc-500">Advertisement</p>
              <p className="text-sm font-medium text-zinc-600">ad-bottom (728x90 or 300x250)</p>
            </div>
          </div>
        </main>

        <HowToSection />
        <AboutSection />
        <Footer />

        {/* Copy Tooltip */}
        {tooltip.show && (
          <div
            className="fixed z-50 pointer-events-none animate-tooltip-fade"
            style={{
              left: tooltip.position.x,
              top: tooltip.position.y - 45,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="rounded-full border border-white/20 bg-black/90 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur-xl">
              已复制!
            </div>
          </div>
        )}

        {/* Mobile Anchor Ad */}
        <div
          id="ad-mobile-anchor"
          className="fixed bottom-0 left-0 right-0 z-[1000] flex h-[60px] items-center justify-center border-t border-white/10 bg-black/90 backdrop-blur-xl sm:hidden"
        >
          <div className="text-center">
            <p className="text-xs text-zinc-500">Advertisement</p>
            <p className="text-xs font-medium text-zinc-600">ad-mobile-anchor (320x50)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
