import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Noto',
  description: 'Learn more about Noto, your ultimate wish list app',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-12">
          <Link 
            href="/" 
            className="text-white text-lg hover:opacity-70 transition-opacity"
          >
            ← Back to Home
          </Link>
        </header>

        {/* Content */}
        <main>
          <h1 
            className="text-5xl md:text-7xl font-bold mb-8"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            About Noto
          </h1>

          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              Noto is a curated wishlist app designed for things worth remembering and sharing.
            </p>

            <p>
              Create beautiful wishlists, discover what others love, and never forget the things that matter.
            </p>

            <p className="text-gray-500 text-base mt-12">
              More information coming soon...
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex gap-8 text-sm">
            <Link href="/terms" className="hover:opacity-70 transition-opacity">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:opacity-70 transition-opacity">
              Support
            </Link>
            <Link href="/faq" className="hover:opacity-70 transition-opacity">
              FAQ
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}









