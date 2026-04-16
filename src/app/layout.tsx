import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Viral Fonts - Free Unicode Font Generator for Social Media',
    template: '%s | Viral Fonts',
  },
  description:
    'Create unique, eye-catching fonts for Instagram, TikTok, and more. 12+ styles, instant copy & paste. No signup required.',
  keywords: [
    'unicode fonts',
    'fancy text generator',
    'instagram fonts',
    'tiktok fonts',
    'text generator',
    'stylish fonts',
    'cool fonts',
    'bio fonts',
    'social media fonts',
  ],
  authors: [{ name: 'Viral Fonts' }],
  openGraph: {
    title: 'Viral Fonts - Free Unicode Font Generator',
    description:
      'Create unique, eye-catching fonts for Instagram, TikTok, and more. 12+ styles, instant copy & paste.',
    url: '/',
    siteName: 'Viral Fonts',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viral Fonts - Free Unicode Font Generator',
    description:
      'Create unique, eye-catching fonts for Instagram, TikTok, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className="antialiased">{isDev && <Inspector />}{children}</body>
    </html>
  );
}
