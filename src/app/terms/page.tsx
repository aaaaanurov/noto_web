import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Noto',
  description: 'Terms of Service and Privacy Policy for Noto',
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

          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p className="text-gray-500">
              Last updated: December 12, 2025
            </p>

            <p>
              Welcome to Noto (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
            </p>

            <p>
              By accessing or using the Noto mobile application, website, and related services (collectively, the &quot;Service&quot;), you agree to these Terms of Service (&quot;Terms&quot;). If you do not agree, please do not use the Service.
            </p>

            {/* 1. About Noto */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">1. About Noto</h2>
              <p>
                Noto is a personal wishlist and collection application that allows users to save, organize, and share items, links, images, and inspirations from across the web and other sources.
              </p>
              <p className="mt-4">
                Noto is a tool for organizing content and does not operate as a marketplace, seller, publisher, or content owner of third-party materials.
              </p>
            </section>

            {/* 2. User Accounts */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">2. User Accounts</h2>
              <p>
                Certain features of the Service require creating an account using supported authentication providers (such as Sign in with Apple or Google).
              </p>
              <p className="mt-4">
                You are responsible for maintaining the confidentiality of your account and for all activity that occurs under your account.
              </p>
            </section>

            {/* 3. User Content */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">3. User Content</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-white mt-6">3.1 Content You Create</h3>
              <p>
                You may create, upload, save, or share content including wishlists, item titles, descriptions, images, and links (&quot;User Content&quot;).
              </p>
              <p className="mt-4">
                You retain ownership of your User Content.
              </p>
              <p className="mt-4">
                By using the Service, you grant Noto a limited, non-exclusive, royalty-free license to host, store, display, and process your User Content solely for the purpose of operating and improving the Service.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">3.2 Third-Party Content and Links</h3>
              <p>
                The Service allows users to save and reference content from third-party sources, including external websites, social platforms, product pages, and images hosted outside of Noto.
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Noto does not own, control, or verify third-party content.</li>
                <li>All third-party content remains the property of its respective owners.</li>
                <li>Third-party links and previews are provided for reference and convenience only.</li>
                <li>Noto makes no guarantees regarding the accuracy, legality, availability, or appropriateness of third-party content.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">3.3 No Responsibility for User Content</h3>
              <p>
                Noto does not review, endorse, or assume responsibility for:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>User Content created or shared by users,</li>
                <li>content saved via external links,</li>
                <li>accuracy, legality, or quality of any User Content or third-party content.</li>
              </ul>
              <p className="mt-4">
                Users are solely responsible for the content they create, save, or share using the Service.
              </p>
            </section>

            {/* 4. Prohibited Use */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">4. Prohibited Use</h2>
              <p>
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>upload or share unlawful, infringing, or harmful content,</li>
                <li>violate intellectual property or privacy rights of others,</li>
                <li>engage in harassment, abuse, or spam,</li>
                <li>attempt to interfere with or disrupt the Service.</li>
              </ul>
              <p className="mt-4">
                We reserve the right to remove content or suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            {/* 5. Intellectual Property */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">5. Intellectual Property</h2>
              <p>
                All rights, title, and interest in the Service, including software, design, branding, and trademarks (excluding User Content), are owned by Noto or its licensors.
              </p>
              <p className="mt-4">
                You may not copy, modify, distribute, or create derivative works from the Service without prior written permission.
              </p>
            </section>

            {/* 6. Disclaimer of Warranties */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">6. Disclaimer of Warranties</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
              </p>
              <p className="mt-4">
                We do not guarantee that:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>the Service will be uninterrupted or error-free,</li>
                <li>saved content will always be available,</li>
                <li>third-party content or links will remain accessible.</li>
              </ul>
            </section>

            {/* 7. Limitation of Liability */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Noto shall not be liable for:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>loss of data or content,</li>
                <li>damages resulting from User Content,</li>
                <li>issues arising from third-party links or services,</li>
                <li>unauthorized access to user accounts.</li>
              </ul>
            </section>

            {/* 8. Account Deletion and Termination */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">8. Account Deletion and Termination</h2>
              <p>
                You may delete your account at any time through the Noto app by navigating to:
              </p>
              <p className="mt-4 font-mono bg-gray-900 px-4 py-2 rounded inline-block">
                Settings → Delete Account
              </p>
              <p className="mt-4">
                When you delete your account:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>your account will be permanently removed,</li>
                <li>your personal profile data and created content will be deleted,</li>
                <li>access to the Service will be terminated,</li>
                <li>this action cannot be undone.</li>
              </ul>
              <p className="mt-4">
                We may retain limited information where required by law or for legitimate purposes such as security, fraud prevention, or legal compliance.
              </p>
              <p className="mt-4">
                If you experience issues deleting your account in the app, you may contact us at{' '}
                <a 
                  href="mailto:support@noto.place" 
                  className="text-white underline hover:opacity-70"
                >
                  support@noto.place
                </a>.
              </p>
            </section>

            {/* 9. Changes to These Terms */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">9. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time.
              </p>
              <p className="mt-4">
                Continued use of the Service after changes indicates acceptance of the updated Terms.
              </p>
            </section>

            {/* 10. Contact */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">10. Contact</h2>
              <p>
                If you have questions about these Terms:
              </p>
              <p className="mt-4">
                <a 
                  href="mailto:support@noto.place" 
                  className="text-white underline hover:opacity-70"
                >
                  support@noto.place
                </a>
              </p>
            </section>

            {/* Privacy Policy Section */}
            <section id="privacy" className="mt-20 pt-12 border-t border-gray-800">
              <h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
              >
                Privacy Policy
              </h1>
              <p className="text-gray-500 mb-8">
                (Part of the Terms of Service)
              </p>
              <p>
                This Privacy Policy explains how Noto collects, uses, and protects personal information.
              </p>

              {/* Privacy 1. Information We Collect */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">1. Information We Collect</h2>
              <p>
                We may collect:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Account information (such as email address provided via Apple or Google Sign-In),</li>
                <li>Profile information (username, avatar),</li>
                <li>User Content (wishlists, items, links, images),</li>
                <li>Usage and analytics data (feature usage, interactions, app performance).</li>
              </ul>

              {/* Privacy 2. How We Use Information */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">2. How We Use Information</h2>
              <p>
                We use personal information to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>operate and maintain the Service,</li>
                <li>save and display User Content,</li>
                <li>improve features and user experience,</li>
                <li>provide customer support,</li>
                <li>ensure security and prevent abuse.</li>
              </ul>

              {/* Privacy 3. Third-Party Services */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">3. Third-Party Services</h2>
              <p>
                We use third-party services for:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>authentication (Apple, Google),</li>
                <li>analytics and performance monitoring,</li>
                <li>infrastructure and hosting.</li>
              </ul>
              <p className="mt-4">
                These services process data according to their own privacy policies.
              </p>

              {/* Privacy 4. Data Sharing */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">4. Data Sharing</h2>
              <p>
                We do not sell personal data.
              </p>
              <p className="mt-4">
                We may share data only:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>with service providers necessary to operate the Service,</li>
                <li>to comply with legal obligations,</li>
                <li>to protect the rights, safety, and security of users and the Service.</li>
              </ul>

              {/* Privacy 5. Data Retention */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">5. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary to provide the Service or comply with legal requirements.
              </p>

              {/* Privacy 6. Account and Data Deletion */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">6. Account and Data Deletion</h2>
              <p>
                You may delete your account and associated personal data at any time directly in the app:
              </p>
              <p className="mt-4 font-mono bg-gray-900 px-4 py-2 rounded inline-block">
                Settings → Delete Account
              </p>
              <p className="mt-4">
                Upon deletion:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>your personal data and User Content will be removed from our systems,</li>
                <li>this action is permanent and cannot be undone.</li>
              </ul>
              <p className="mt-4">
                If deletion cannot be completed in the app, you may request assistance by contacting{' '}
                <a 
                  href="mailto:support@noto.place" 
                  className="text-white underline hover:opacity-70"
                >
                  support@noto.place
                </a>{' '}
                using the email address associated with your account.
              </p>

              {/* Privacy 7. Security */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">7. Security</h2>
              <p>
                We apply reasonable technical and organizational measures to protect personal data.
              </p>
              <p className="mt-4">
                However, no method of transmission or storage is completely secure.
              </p>

              {/* Privacy 8. Changes to This Privacy Policy */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Updates will be posted on this page.
              </p>

              {/* Privacy 9. Contact */}
              <h2 className="text-2xl font-bold mb-4 text-white mt-12">9. Contact</h2>
              <p>
                For privacy-related questions or requests:
              </p>
              <p className="mt-4">
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
