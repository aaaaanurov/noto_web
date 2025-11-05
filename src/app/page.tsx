import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ChatGPT Image 30 окт. 2025 г., 17_35_09.png"
          alt="Noto - Your ultimate wish list"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="absolute" style={{ paddingLeft: '45px', paddingTop: '90px' }}>
          <Link 
            href="/about" 
            className="text-white text-[30px] font-bold tracking-tight hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            ABOUT
          </Link>
        </header>

        {/* Logo (Center, rotated) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: '45px' }}>
          <div className="relative" style={{ transform: 'rotate(-5deg)' }}>
            <Image
              src="/images/logo.png"
              alt="Noto"
              width={491}
              height={261}
              className="w-44"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute left-[45px] bottom-[100px]">
          <h1
            className="font-bold m-0 leading-[0.95] text-[clamp(44px,8vw,90px)] tracking-[-0.02em]"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            {/* строка 1 — якорь для кнопки */}
            <span className="relative inline-block">
              your ultimate
              {/* бейдж — строго под первой строкой и смещён вправо */}
              <a
                href="https://apps.apple.com/app/noto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="absolute left-0 top-full mt-[28px] translate-x-[335px] sm:translate-x-[355px] lg:translate-x-[375px] hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
                  alt="Download on the App Store"
                  width={160}
                  height={47}
                />
              </a>
            </span>

            {/* строка 2 */}
            <span className="block">wish-list</span>
          </h1>
        </div>

        {/* Footer */}
        <div className="absolute flex text-[20px]" style={{ right: '100px', bottom: '100px', gap: '100px' }}>
          <Link 
            href="/terms" 
            className="font-bold hover:opacity-70 transition-opacity"
            style={{ 
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '-0.2px'
            }}
          >
            terms service
          </Link>
          <Link 
            href="/support" 
            className="font-bold hover:opacity-70 transition-opacity"
            style={{ 
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '-0.2px'
            }}
          >
            support
          </Link>
          <Link 
            href="/faq" 
            className="font-bold hover:opacity-70 transition-opacity"
            style={{ 
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '-0.2px'
            }}
          >
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
