'use client';

import { Type, Wand2, Copy } from 'lucide-react';

const steps = [
  {
    icon: Type,
    title: 'Type',
    description: 'Enter your text in the input field above',
  },
  {
    icon: Wand2,
    title: 'Generate',
    description: 'Browse through 12+ unique font styles',
  },
  {
    icon: Copy,
    title: 'Copy',
    description: 'Click to copy and paste anywhere',
  },
];

export function HowToSection() {
  return (
    <section className="relative z-10 border-t border-white/5 bg-black/20 py-16 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-10 text-center text-2xl font-bold text-white">
          How to Use
        </h2>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-8 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 ring-1 ring-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400">
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white ring-1 ring-white/10">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
