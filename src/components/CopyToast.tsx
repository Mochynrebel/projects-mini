'use client';

import { useEffect, useState, useCallback } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  position: { x: number; y: number } | null;
  onComplete: () => void;
}

export function CopyToast({ message, position, onComplete }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (position) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 200);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [position, onComplete]);

  if (!position) return null;

  // Calculate position to keep toast in viewport
  const toastWidth = 100;
  const toastHeight = 40;
  const offsetX = 10;
  const offsetY = -50;

  let left = position.x + offsetX;
  let top = position.y + offsetY;

  // Keep within viewport bounds
  if (left + toastWidth > window.innerWidth - 20) {
    left = window.innerWidth - toastWidth - 20;
  }
  if (left < 20) {
    left = 20;
  }
  if (top < 20) {
    top = position.y + 20;
  }
  if (top + toastHeight > window.innerHeight - 20) {
    top = window.innerHeight - toastHeight - 20;
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-200 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-purple-500/30">
        <Check className="h-4 w-4" />
        <span>{message}</span>
      </div>
    </div>
  );
}

// Hook to manage toast state
export function useCopyToast() {
  const [toast, setToast] = useState<{
    message: string;
    position: { x: number; y: number } | null;
  }>({ message: '', position: null });

  const showToast = useCallback((message: string, position: { x: number; y: number }) => {
    setToast({ message, position });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', position: null });
  }, []);

  return { toast, showToast, hideToast };
}
