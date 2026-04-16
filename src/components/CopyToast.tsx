'use client';

import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CopyToastProps {
  show: boolean;
}

export function CopyToast({ show }: CopyToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-5 py-2.5 backdrop-blur-xl shadow-lg shadow-black/50">
        <Check className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-medium text-white">Copied to clipboard!</span>
      </div>
    </div>
  );
}
