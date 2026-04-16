'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { TextInput } from '@/components/TextInput';
import { FontGrid } from '@/components/FontGrid';
import { CopyToast } from '@/components/CopyToast';
import { HowToSection } from '@/components/HowToSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(() => {
    setShowToast(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-pink fixed -left-40 -top-40 h-96 w-96" />
      <div className="gradient-orb gradient-orb-orange fixed -bottom-40 -right-40 h-96 w-96" />
      <div className="gradient-orb gradient-orb-pink fixed left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-3xl px-4 py-10">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <p className="mb-6 text-sm text-zinc-400 sm:text-base">
              Transform your text into 12+ unique font styles. Perfect for Instagram bios, TikTok captions, and more.
            </p>
            <TextInput value={inputText} onChange={setInputText} />
          </section>

          {/* Font Grid */}
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Font Styles</h2>
              <span className="text-xs text-zinc-500">12 styles available</span>
            </div>
            <FontGrid inputText={inputText} onCopy={handleCopy} />
          </section>
        </main>

        <HowToSection />
        <AboutSection />
        <Footer />

        <CopyToast show={showToast} />
      </div>
    </div>
  );
}
