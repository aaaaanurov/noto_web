import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noto - Your Ultimate Wish List",
  description: "Noto — a curated wishlist app for things worth remembering and sharing",
  keywords: ["wishlist", "wishlist app", "gift ideas", "curated lists", "iOS app"],
  authors: [{ name: "Noto" }],
  creator: "Noto",
  publisher: "Noto",
  metadataBase: new URL('https://noto.place'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noto.place',
    title: 'Noto - Your Ultimate Wish List',
    description: 'Noto — a curated wishlist app for things worth remembering and sharing',
    siteName: 'Noto',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'Noto - Your Ultimate Wish List',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noto - Your Ultimate Wish List',
    description: 'Noto — a curated wishlist app for things worth remembering and sharing',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Noto',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

