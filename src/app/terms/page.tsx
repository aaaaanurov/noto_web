import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Noto',
  description: 'Terms of Service for Noto',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p className="text-gray-500">
              Last updated: November 5, 2025
            </p>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Coming Soon</h2>
              <p>
                Our Terms of Service are being finalized. Please check back soon for updates.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
              <p>
                If you have any questions, please contact us at{' '}
                <a 
                  href="mailto:support@noto.place" 
                  className="text-white underline hover:opacity-70"
                >
                  support@noto.place
                </a>
              </p>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex gap-8 text-sm">
            <Link href="/about" className="hover:opacity-70 transition-opacity">
              About
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



