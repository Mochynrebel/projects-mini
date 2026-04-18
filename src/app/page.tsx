'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dice5 } from 'lucide-react';
import FontGrid from '@/components/FontGrid';
import { Button } from '@/components/ui/button';
import { convertText, fontStyles } from '@/lib/fonts';

const DEFAULT_TEXT = 'i love type';
const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 6;
const CURRENT_YEAR = 2026;

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [pendingScrollStyleId, setPendingScrollStyleId] = useState<string | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const styleMap = useMemo(() => {
    return new Map(fontStyles.map((style) => [style.id, style]));
  }, []);

  const clearCopyTimer = useCallback(() => {
    if (copyTimeoutRef.current !== null) {
      window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearCopyTimer();
    };
  }, [clearCopyTimer]);

  const writeClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }, []);

  const handleCopyStyle = useCallback(
    async (styleId: string) => {
      const style = styleMap.get(styleId);

      if (!style) {
        return;
      }

      const convertedText = convertText(inputText, style.mapping);
      await writeClipboard(convertedText);

      setSelectedStyleId(styleId);
      setCopiedStyleId(styleId);
      clearCopyTimer();
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedStyleId(null);
        copyTimeoutRef.current = null;
      }, 1200);
    },
    [clearCopyTimer, inputText, styleMap, writeClipboard]
  );

  const revealStyle = useCallback((styleId: string) => {
    const styleIndex = fontStyles.findIndex((style) => style.id === styleId);

    if (styleIndex === -1) {
      return;
    }

    const nextVisibleCount = Math.max(visibleCount, styleIndex + 1);

    if (nextVisibleCount !== visibleCount) {
      setVisibleCount(nextVisibleCount);
    }

    setPendingScrollStyleId(styleId);
  }, [visibleCount]);

  useEffect(() => {
    if (!pendingScrollStyleId) {
      return;
    }

    const styleIndex = fontStyles.findIndex((style) => style.id === pendingScrollStyleId);
    if (styleIndex === -1 || styleIndex >= visibleCount) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const card = document.getElementById(`font-card-${pendingScrollStyleId}`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setPendingScrollStyleId(null);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pendingScrollStyleId, visibleCount]);

  const handleRandomStyle = useCallback(async () => {
    const randomStyle = fontStyles[Math.floor(Math.random() * fontStyles.length)];

    if (!randomStyle) {
      return;
    }

    revealStyle(randomStyle.id);
    await handleCopyStyle(randomStyle.id);
  }, [handleCopyStyle, revealStyle]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_COUNT, fontStyles.length));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div
        id="ad-mobile-anchor"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 p-2 text-center backdrop-blur-lg md:hidden"
      >
        <div className="flex min-h-[50px] items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5">
          <span className="text-xs text-white/40">Mobile Anchor: 320x50</span>
        </div>
      </div>

      <main className="relative pb-20 md:pb-8">
        <header className="px-4 pb-8 pt-12 text-center">
          <nav className="mb-6 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-pink-400/40 hover:text-white"
            >
              Generator
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-pink-400/40 hover:text-white"
            >
              Blog
            </Link>
          </nav>
          <h1 className="mb-3 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            Small Text Generator
          </h1>
          <p className="text-lg text-white/60 sm:text-xl">
            Copy &amp; Paste Tiny Fonts for X and IG
          </p>
        </header>

        <div id="ad-top" className="mx-auto mb-8 max-w-4xl px-4">
          <div className="flex min-h-[90px] items-center justify-center rounded-xl border-2 border-dashed border-white/[0.1] bg-white/[0.02]">
            <div className="text-center">
              <div className="mb-1 text-sm font-medium text-white/40">Advertisement</div>
              <div className="text-xs text-white/20">728x90 / Responsive</div>
            </div>
          </div>
        </div>

        <section className="mx-auto mb-12 max-w-4xl px-4">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label
                htmlFor="text-input"
                className="block text-sm font-medium uppercase tracking-wider text-white/50"
              >
                Enter your text
              </label>
              <Button
                type="button"
                onClick={handleRandomStyle}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition-transform hover:scale-[1.01] hover:from-pink-400 hover:to-orange-300"
              >
                <Dice5 className="h-4 w-4" />
                Random Font
              </Button>
            </div>
            <textarea
              id="text-input"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Type something..."
              className="w-full resize-none rounded-2xl border border-white/[0.1] bg-white/[0.05] p-4 text-lg text-white transition-all duration-300 placeholder:text-white/30 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 sm:p-5 sm:text-xl"
              rows={2}
            />
            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <span className="text-white/40">
                Pick any card below or use Random Font for an instant surprise.
              </span>
              <span className="text-right text-white/30">{inputText.length} characters</span>
            </div>
          </div>
        </section>

        <section className="mx-auto mb-12 max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                {fontStyles.length} Styles
              </span>
            </h3>
            <p className="text-right text-sm text-white/40">Click any style to copy</p>
          </div>
          <FontGrid
            inputText={inputText}
            visibleCount={visibleCount}
            selectedStyleId={selectedStyleId}
            copiedStyleId={copiedStyleId}
            onCopyStyle={handleCopyStyle}
            onLoadMore={handleLoadMore}
          />
        </section>

        <div id="ad-bottom" className="mx-auto mb-12 max-w-4xl px-4">
          <div className="flex min-h-[250px] items-center justify-center rounded-xl border-2 border-dashed border-white/[0.1] bg-white/[0.02] sm:min-h-[90px]">
            <div className="text-center">
              <div className="mb-1 text-sm font-medium text-white/40">Advertisement</div>
              <div className="text-xs text-white/20">728x90 or 300x250</div>
            </div>
          </div>
        </div>

        <section className="mx-auto mb-16 max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              How to Use
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: '1', title: 'Type', desc: 'Enter your text in the input box above' },
              { step: '2', title: 'Generate', desc: 'See your text transformed into unique fonts instantly' },
              { step: '3', title: 'Copy', desc: 'Click on any style to copy it to your clipboard' },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-16 max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              About Unicode Fonts
            </span>
          </h2>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            <p className="mb-4 leading-relaxed text-white/70">
              Unicode is a universal character encoding standard that assigns a unique number to every character,
              regardless of the platform, program, or language. Our font generator uses Unicode&apos;s mathematical,
              enclosed, and combining character blocks to transform your regular text into stylized versions.
            </p>
            <p className="mb-4 leading-relaxed text-white/70">
              These stylized characters work in most modern browsers and apps, including Instagram, TikTok,
              Twitter, Discord, and more. They&apos;re perfect for making your social media bios, captions,
              and messages stand out from the crowd.
            </p>
            <p className="text-sm text-white/50">
              Note: Some platforms may not support all Unicode characters. If a character doesn&apos;t display
              correctly, try a different style or device.
            </p>
          </div>
        </section>

        <footer className="border-t border-white/[0.05] py-8 text-center">
          <p className="text-sm text-white/40">
            &copy; {CURRENT_YEAR} Small Text Generator. Made with love for social media enthusiasts.
          </p>
        </footer>
      </main>
    </div>
  );
}
