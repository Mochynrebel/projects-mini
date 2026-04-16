'use client';

import { X } from 'lucide-react';
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
        className={`relative overflow-hidden rounded-3xl border bg-white/5 transition-all duration-300 ${
          isFocused
            ? 'border-pink-500/50 shadow-lg shadow-pink-500/20'
            : 'border-white/10'
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your text here..."
          className="min-h-[140px] w-full resize-none bg-transparent p-5 text-lg text-white placeholder-zinc-500 outline-none"
          maxLength={500}
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-zinc-400 transition-all duration-200 hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between px-1">
        <span className="text-xs text-zinc-500">
          {value.length > 0 && 'Live preview below'}
        </span>
        <span className="text-xs text-zinc-600">
          {value.length}/500
        </span>
      </div>
    </div>
  );
}
