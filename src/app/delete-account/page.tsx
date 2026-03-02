import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account - Noto',
  description: 'How to delete your Noto account and personal data',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeleteAccountPage() {
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
            Delete Account
          </h1>

          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p>
              You can permanently delete your Noto account and all associated data at any time.
            </p>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">How to delete your account</h2>
              <p>Open the Noto app and navigate to:</p>
              <p className="mt-4 font-mono bg-gray-900 px-4 py-3 rounded inline-block">
                Settings → Delete Account
              </p>
              <p className="mt-6">
                Follow the on-screen instructions to confirm deletion.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">What happens when you delete your account</h2>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Your account will be permanently removed</li>
                <li>Your profile, wishlists, and saved items will be deleted</li>
                <li>Your followers and subscriptions will be removed</li>
                <li>This action cannot be undone</li>
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Need help?</h2>
              <p>
                If you are unable to delete your account through the app, contact us at{' '}
                <a 
                  href="mailto:support@noto.place" 
                  className="text-white underline hover:opacity-70 transition-opacity"
                >
                  support@noto.place
                </a>
                {' '}and we will process your request.
              </p>
              <p className="mt-4 text-gray-500">
                Please use the email address associated with your account.
              </p>
            </section>
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
