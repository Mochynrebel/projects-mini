'use client';

import { Info } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="relative z-10 border-t border-white/5 bg-black/20 py-16 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Info className="h-5 w-5 text-pink-400" />
          <h2 className="text-2xl font-bold text-white">
            About Unicode Fonts
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="prose prose-invert prose-sm max-w-none space-y-4 text-zinc-300">
            <p>
              Unicode is a universal character encoding standard that assigns a unique number to every character, regardless of platform, program, or language. While most people only see basic Latin letters (A-Z, a-z), Unicode actually includes thousands of different character sets from languages around the world.
            </p>
            <p>
              <strong className="text-white">How it works:</strong> Each Unicode font style you see below uses a different block of Unicode characters. For example, the bold letters use the &quot;Mathematical Alphanumeric Symbols&quot; block (U+1D400 to U+1D7FF), while the circled letters use enclosed alphanumeric characters (U+2460 to U+24FF).
            </p>
            <p>
              <strong className="text-white">Compatibility:</strong> Since these are standard Unicode characters, they work in most apps and platforms that support Unicode text — including Instagram, TikTok, Twitter, Discord, and more. No special fonts or plugins needed!
            </p>
            <p>
              <strong className="text-white">Tip:</strong> Not all Unicode characters are supported everywhere. If a character shows up as a box or question mark, that platform does not support that particular Unicode block.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
