import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PoweredBy } from '@/components/layout/PoweredBy';
import { JsonLd } from '@/components/seo/JsonLd';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';
import { organizationSchema, webApplicationSchema } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/config/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Conversion Wizard – Free & Private Image Converter',
    template: `%s`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'image converter',
    'HEIC to PNG',
    'JPG to PNG',
    'PNG to JPG',
    'WEBP converter',
    'convert images online',
    'free image converter',
  ],
  authors: [{ name: siteConfig.organization }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Set the theme before paint to avoid a flash. Defaults to dark; a
            remembered choice ('light' | 'dark' | 'system') wins. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;if(t==='system'){d=window.matchMedia('(prefers-color-scheme: dark)').matches;}document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        {/* Google AdSense (loader + site-ownership meta). */}
        {siteConfig.adsensePublisherId && (
          <>
            <meta name="google-adsense-account" content={siteConfig.adsensePublisherId} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsensePublisherId}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={[organizationSchema(), webApplicationSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <PoweredBy />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
