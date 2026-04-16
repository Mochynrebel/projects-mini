'use client';

import { useState, useCallback } from 'react';
import { Sparkles, Type, Wand2, Copy } from 'lucide-react';
import { TextInput } from '@/components/TextInput';
import { FontGrid } from '@/components/FontGrid';
import { CopyToast } from '@/components/CopyToast';
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
    <div className="relative min-h-screen overflow-hidden">
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
                    <p className="text-sm text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="border-t border-white/5 bg-black/20 py-16 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <h2 className="text-2xl font-bold text-[#f0f0f0]">
                About Unicode Fonts
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: '#1e1e1e' }}>
              <div className="prose prose-invert prose-sm max-w-none space-y-4 text-zinc-300">
                <p>
                  Unicode is a universal character encoding standard that assigns a unique number to every character, regardless of platform, program, or language. While most people only see basic Latin letters (A-Z, a-z), Unicode actually includes thousands of different character sets from languages around the world.
                </p>
                <p>
                  <strong className="text-[#f0f0f0]">How it works:</strong> Each Unicode font style you see below uses a different block of Unicode characters. For example, the bold letters use the &quot;Mathematical Alphanumeric Symbols&quot; block (U+1D400 to U+1D7FF), while the circled letters use enclosed alphanumeric characters (U+2460 to U+24FF).
                </p>
                <p>
                  <strong className="text-[#f0f0f0]">Compatibility:</strong> Since these are standard Unicode characters, they work in most apps and platforms that support Unicode text — including Instagram, TikTok, Twitter, Discord, and more. No special fonts or plugins needed!
                </p>
                <p>
                  <strong className="text-[#f0f0f0]">Tip:</strong> Not all Unicode characters are supported everywhere. If a character shows up as a box or question mark, that platform does not support that particular Unicode block.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/40 py-8">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Viral Fonts. Made with love for creative minds.
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              Create stunning text for your social media bios, captions, and stories.
            </p>
          </div>
        </footer>

        <CopyToast show={showToast} />
      </div>
    </div>
  );
}
