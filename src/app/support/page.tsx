import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Noto',
  description: 'Get help and support for Noto',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SupportPage() {
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
            Support
          </h1>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Need help with Noto? We're here to assist you.
            </p>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
              <p>
                Email us at{' '}
                <a 
                  href="mailto:support@noto.place" 
                  className="text-white underline hover:opacity-70 transition-opacity"
                >
                  support@noto.place
                </a>
              </p>
              <p className="mt-4 text-gray-500">
                We typically respond within 24-48 hours.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Common Questions</h2>
              <p>
                Check out our <Link href="/faq" className="text-white underline hover:opacity-70">FAQ page</Link> for answers to common questions.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
              <p className="text-gray-500">
                Stay updated with the latest news and features.
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
            <Link href="/terms" className="hover:opacity-70 transition-opacity">
              Terms of Service
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


