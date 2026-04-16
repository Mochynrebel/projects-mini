'use client';

import { useState, useCallback } from 'react';
import { FontCard } from './FontCard';
import { fontStyles, convertText } from '@/lib/fonts';

interface FontGridProps {
  inputText: string;
  onCopy: () => void;
}

export function FontGrid({ inputText, onCopy }: FontGridProps) {
  const handleCopy = useCallback(() => {
    onCopy();
  }, [onCopy]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fontStyles.map((style, index) => (
        <div
          key={style.id}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
          <FontCard
            styleId={style.id}
            styleName={style.name}
            previewText={convertText(inputText || 'Your text here...', style.id)}
            convertedText={convertText(inputText, style.id)}
            onCopy={handleCopy}
          />
        </div>
      ))}
    </div>
  );
}
