import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/ChatGPT Image 30 окт. 2025 г., 17_35_09.png"
          alt="Noto - Your ultimate wish list"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Page container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full">
          <div className="px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 lg:pt-14">
            <Link
              href="/about"
              className="text-white font-bold tracking-tight hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              <span className="text-[22px] sm:text-[26px] lg:text-[30px]">ABOUT</span>
            </Link>
          </div>
        </header>

        {/* Logo (center, rotated) */}
        <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8">
          <div className="relative -rotate-[5deg]">
            <Image
              src="/images/logo.png"
              alt="Noto"
              width={491}
              height={261}
              className="w-[140px] sm:w-[200px] lg:w-[260px] xl:w-[300px] h-auto"
              priority
            />
          </div>
        </div>

        {/* Main content (pushes footer down) */}
        <main className="flex-1 flex items-end">
          <div
            className="
              w-full
              px-4 sm:px-6 lg:px-12
              pb-16 sm:pb-20 lg:pb-24
            "
          >
            {/* Hero Title */}
            <h1
              className="font-bold m-0 tracking-[-0.02em] text-[clamp(44px,8vw,90px)] leading-[0.95]"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              <span className="block">your ultimate</span>
              <span className="block">wish-list</span>
            </h1>

            {/* App Store badge — адаптивный сдвиг и масштаб */}
            <a
              href="https://apps.apple.com/app/noto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="
                inline-block
                mt-[28px] md:mt-[32px]
                max-[360px]:ml-0
                ml-[80px]
                sm:ml-[140px]
                md:ml-[220px]
                lg:ml-[350px]
                xl:ml-[390px]
                hover:opacity-80 transition-opacity
              "
            >
              <Image
                src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
                alt="Download on the App Store"
                width={180}
                height={53}
                className="h-auto w-[140px] sm:w-[160px] lg:w-[180px]"
              />
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full">
          <div
            className="
              px-4 sm:px-6 lg:px-12
              pb-10
              flex flex-col sm:flex-row sm:items-center sm:justify-end
              gap-4 sm:gap-10 lg:gap-[100px]
            "
          >
            <Link
              href="/terms"
              className="font-bold hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.2px' }}
            >
              <span className="text-[18px] sm:text-[20px]">terms service</span>
            </Link>
            <Link
              href="/support"
              className="font-bold hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.2px' }}
            >
              <span className="text-[18px] sm:text-[20px]">support</span>
            </Link>
            <Link
              href="/faq"
              className="font-bold hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.2px' }}
            >
              <span className="text-[18px] sm:text-[20px]">FAQ</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
