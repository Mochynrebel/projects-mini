'use client';

import { useState, useCallback } from 'react';
import { Sparkles, Type, Wand2, Copy } from 'lucide-react';
import { TextInput } from '@/components/TextInput';
import { FontGrid } from '@/components/FontGrid';
import { CopyToast } from '@/components/CopyToast';
import { AdBanner } from '@/components/AdBanner';
import { MobileAnchorAd } from '@/components/MobileAnchorAd';
import { fontStyles } from '@/lib/fonts';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [styleCount, setStyleCount] = useState({ shown: 12, total: fontStyles.length });

  const handleCopy = useCallback(() => {
    setShowToast(true);
  }, []);

  const handleCountChange = useCallback((shown: number, total: number) => {
    setStyleCount({ shown, total });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 md:pb-0">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-purple fixed -left-60 -top-60 h-[500px] w-[500px]" />
      <div className="gradient-orb gradient-orb-pink fixed -bottom-60 -right-60 h-[500px] w-[500px]" />
      <div className="gradient-orb gradient-orb-orange fixed left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 bg-black/30 py-6 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="mb-2 inline-flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <h1 className="gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl">
                Viral Fonts
              </h1>
            </div>
            <p className="text-base text-zinc-400 sm:text-lg">
              Create unique bios with one click
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">
          {/* Top Banner Ad */}
          <div className="mb-8">
            <AdBanner id="ad-top" size="leaderboard" />
          </div>

          {/* Hero Section */}
          <section className="mb-10 text-center">
            <p className="mb-6 text-sm text-zinc-400 sm:text-base">
              Transform your text into {fontStyles.length}+ unique font styles. Perfect for Instagram bios, TikTok captions, and more.
            </p>
            <TextInput value={inputText} onChange={setInputText} />
          </section>

          {/* Font Grid */}
          <section className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#f0f0f0]">Font Styles</h2>
              <span className="text-sm text-zinc-500">
                Showing {styleCount.shown} of {styleCount.total} styles
              </span>
            </div>
            <FontGrid inputText={inputText} onCopy={handleCopy} onCountChange={handleCountChange} />
          </section>
        </main>

        {/* How to Use Section */}
        <section className="border-t border-white/5 bg-black/30 py-16 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-[#f0f0f0]">
              How to Use
            </h2>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-1/2 top-12 hidden h-0.5 w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent sm:block" />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  { icon: Type, title: 'Type', description: 'Enter your text in the input field above' },
                  { icon: Wand2, title: 'Generate', description: 'Browse through 52+ unique font styles' },
                  { icon: Copy, title: 'Copy', description: 'Click to copy and paste anywhere' },
                ].map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 ring-1 ring-purple-500/20">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-button">
                        <step.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white ring-1 ring-purple-400/30">
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-[#f0f0f0]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#f0f0f0]">
              About Unicode Fonts
            </h2>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                Unicode is a universal character encoding standard that supports over 143,000 characters from 154 scripts. Each Unicode character has a unique code point that can be displayed using different fonts and styles.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                Our font generator uses Unicode mathematical alphanumeric symbols to transform your regular text into stylized versions. These symbols are supported by most modern devices and browsers, making your text appear in unique styles on social media platforms.
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                Simply type your text, choose a style you like, and copy it to use in your Instagram bio, TikTok captions, Twitter posts, or anywhere else you want to stand out!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/30 py-8 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="gradient-text font-bold">Viral Fonts</span>
            </div>
            <p className="text-sm text-zinc-500">
              Create unique text styles for social media. No signup required.
            </p>
            <p className="mt-4 text-xs text-zinc-600">
              © {new Date().getFullYear()} Viral Fonts. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Mobile Anchor Ad */}
      <MobileAnchorAd />

      {/* Copy Toast */}
      <CopyToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
