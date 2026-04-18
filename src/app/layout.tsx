import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';
import './globals.css';

const googleTagInlineScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-M8WE2GN3LY');`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Small Text Generator | Copy & Paste for X & IG | Tiny Fonts Online',
    template: '%s | Small Text Generator',
  },
  description:
    'Free Small Text Generator: create tiny fonts, small caps, and superscript. Copy and paste instantly for X (Twitter), Instagram, and more. No signup required.',
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
  authors: [{ name: 'Small Text Generator' }],
  openGraph: {
    title: 'Small Text Generator | Tiny Fonts Online',
    description:
      'Free Small Text Generator: create tiny fonts, small caps, and superscript. Copy and paste instantly for X (Twitter), Instagram, and more.',
    url: '/',
    siteName: 'Small Text Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Small Text Generator | Tiny Fonts Online',
    description:
      'Free Small Text Generator: create tiny fonts, small caps, and superscript. Copy and paste instantly for X (Twitter), Instagram, and more.',
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
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M8WE2GN3LY"
        />
        <script dangerouslySetInnerHTML={{ __html: googleTagInlineScript }} />
        {children}
      </body>
    </html>
  );
}
