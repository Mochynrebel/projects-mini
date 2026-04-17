'use client';

import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative z-10 border-b border-white/5 bg-black/20 py-6 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mb-2 inline-flex items-center gap-2">
          <Sparkles className="h-6 w-6 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent" />
          <h1 className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Small Text Generator
          </h1>
        </div>
        <p className="text-sm text-zinc-400 sm:text-base">
          Copy & Paste Tiny Fonts for X and IG
        </p>
      </div>
    </header>
  );
}
