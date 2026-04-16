'use client';

import { X, Type } from 'lucide-react';
import { useState, useCallback } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isFocused
            ? 'border-purple-500/60 shadow-lg shadow-purple-500/20'
            : 'border-white/10'
        }`}
        style={{ backgroundColor: '#1e1e1e' }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your text here..."
          className="min-h-[120px] w-full resize-none border-0 bg-transparent p-5 text-lg text-[#f0f0f0] placeholder-zinc-500 outline-none"
          maxLength={500}
          style={{ backgroundColor: 'transparent' }}
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-zinc-400 transition-all duration-200 hover:bg-white/20 hover:text-white"
            aria-label="Clear text"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-zinc-500" />
          <span className="text-xs text-zinc-500">
            {value.length > 0 ? 'Live preview below' : 'Start typing to see previews'}
          </span>
        </div>
        <span className="text-xs text-zinc-600">
          {value.length}/500
        </span>
      </div>
    </div>
  );
}
