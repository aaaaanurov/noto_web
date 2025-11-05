import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Noto',
  description: 'Frequently asked questions about Noto',
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is Noto?',
      answer: 'Noto is a curated wishlist app designed for things worth remembering and sharing. Create beautiful wishlists and discover what others love.',
    },
    {
      question: 'Is Noto free?',
      answer: 'Information about pricing will be available soon.',
    },
    {
      question: 'What platforms does Noto support?',
      answer: 'Noto is currently available on iOS. More platforms coming soon.',
    },
    {
      question: 'How do I create a wishlist?',
      answer: 'Download the Noto app from the App Store to start creating your wishlists.',
    },
  ];

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
            className="text-5xl md:text-7xl font-bold mb-12"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            FAQ
          </h1>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-800 pb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {faq.question}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-16 p-8 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-300 mb-4">
              We&apos;re here to help. Contact our support team.
            </p>
            <Link 
              href="/support"
              className="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </Link>
          </section>
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
            <Link href="/support" className="hover:opacity-70 transition-opacity">
              Support
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}


