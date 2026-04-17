'use client';

import { useState, useCallback } from 'react';
import { fontStyles } from '@/lib/fonts';
import FontGrid from '@/components/FontGrid';

const DEFAULT_TEXT = 'i love type';

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_TEXT);

  const handleCopy = useCallback(async (text: string, event: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Fixed Mobile Ad Anchor */}
      <div id="ad-mobile-anchor" className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg z-50 p-2 text-center border-t border-white/10">
        <div className="bg-white/5 border border-dashed border-white/20 rounded-lg min-h-[50px] flex items-center justify-center">
          <span className="text-white/40 text-xs">Mobile Anchor: 320x50</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative pb-20 md:pb-8">
        {/* Header */}
        <header className="text-center pt-12 pb-8 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            Viral Fonts
          </h1>
          <p className="text-white/60 text-lg sm:text-xl">
            Create unique bios with one click
          </p>
        </header>

        {/* Top Ad Banner */}
        <div id="ad-top" className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white/[0.02] border-2 border-dashed border-white/[0.1] rounded-xl min-h-[90px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-white/40 text-sm font-medium mb-1">Advertisement</div>
              <div className="text-white/20 text-xs">728x90 / Responsive</div>
            </div>
          </div>
        </div>

        {/* Text Input Section */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <label htmlFor="text-input" className="block text-sm font-medium text-white/50 mb-3 uppercase tracking-wider">
              Enter your text
            </label>
            <textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl p-4 sm:p-5 text-white text-lg sm:text-xl placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 resize-none"
              rows={2}
            />
            <div className="mt-3 text-xs text-white/30 text-right">
              {inputText.length} characters
            </div>
          </div>
        </section>

        {/* Font Styles Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                {fontStyles.length} Styles
              </span>
            </h2>
            <span className="text-sm text-white/40">
              Click any style to copy
            </span>
          </div>
          <FontGrid inputText={inputText} onCopy={handleCopy} />
        </section>

        {/* Bottom Ad */}
        <div id="ad-bottom" className="max-w-4xl mx-auto px-4 mb-12">
          <div className="bg-white/[0.02] border-2 border-dashed border-white/[0.1] rounded-xl min-h-[250px] sm:min-h-[90px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-white/40 text-sm font-medium mb-1">Advertisement</div>
              <div className="text-white/20 text-xs">728x90 or 300x250</div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              How to Use
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Type', desc: 'Enter your text in the input box above' },
              { step: '2', title: 'Generate', desc: 'See your text transformed into unique fonts instantly' },
              { step: '3', title: 'Copy', desc: 'Click on any style to copy it to your clipboard' },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Unicode Section */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              About Unicode Fonts
            </span>
          </h2>
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <p className="text-white/70 leading-relaxed mb-4">
              Unicode is a universal character encoding standard that assigns a unique number to every character, 
              regardless of the platform, program, or language. Our font generator uses Unicode&apos;s Mathematical 
              Alphanumeric Symbols block (U+1D400 to U+1D7FF) to transform your regular text into stylized versions.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              These stylized characters work in most modern browsers and apps, including Instagram, TikTok, 
              Twitter, Discord, and more. They&apos;re perfect for making your social media bios, captions, 
              and messages stand out from the crowd.
            </p>
            <p className="text-white/50 text-sm">
              Note: Some platforms may not support all Unicode characters. If a character doesn&apos;t display 
              correctly, try a different style or device.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.05] py-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Viral Fonts. Made with love for social media enthusiasts.
          </p>
        </footer>
      </main>
    </div>
  );
}
