'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40 py-8">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm text-zinc-500">
          &copy; {currentYear} Small Text Generator. Made with love for creative minds.
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          Create stunning text for your social media bios, captions, and stories.
        </p>
      </div>
    </footer>
  );
}
