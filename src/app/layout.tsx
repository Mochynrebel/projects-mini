import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';
import './globals.css';

const googleTagInlineScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-M8WE2GN3LY');`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Small Text Generator | Copy & Paste for X & IG | Tiny Fonts Online',
    template: '%s | Small Text Generator',
  },
  description:
    'Free Small Text Generator: create tiny fonts, small caps, and superscript. Copy and paste instantly for X (Twitter), Instagram, and more. No signup required.',
  keywords: [
    'small text generator',
    'tiny fonts',
    'copy and paste fonts',
    'Unicode font generator',
    'stylish text generator',
    'social media fonts',
    'fonts for Instagram',
    'text styles online',
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
