import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Page container */}
      <div className="relative min-h-screen">
        {/* Header */}
        <div className="absolute left-[45px] top-[90px] hidden">
          <Link
            href="/about"
            className="font-bold tracking-tight hover:opacity-70 transition-opacity text-[30px]"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            ABOUT
          </Link>
        </div>

        {/* Logo (center, rotated) */}
        <div className="absolute left-1/2 top-[45px] -translate-x-1/2">
          <div className="-rotate-[5deg]">
            <Image
              src="/images/logo.png"
              alt="Noto"
              width={491}
              height={261}
              priority
              className="w-[140px] sm:w-[200px] lg:w-[260px] xl:w-[300px] h-auto"
            />
          </div>
        </div>

        {/* Bottom band — одна базовая линия слева/справа */}
        <div className="absolute left-[45px] right-[45px] bottom-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
            {/* LEFT: заголовок + бейдж */}
            <div className="pb-[2px]">
              {/* Заголовок */}
              <h1
                className="m-0 font-bold tracking-[-0.02em] text-[clamp(44px,8vw,90px)] leading-[0.95]"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
              >
                {/* Строка 1 */}
                <span className="block">your ultimate</span>
                
                {/* Строка 2 + бейдж на одной линии */}
                <span className="flex items-baseline gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                  <span>wish-list</span>
                  
                  {/* Бейдж — на одной линии с "wish-list" */}
                  <a
                    href="https://apps.apple.com/app/noto"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download on the App Store"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
                      alt="Download on the App Store"
                      width={180}
                      height={53}
                      className="h-auto w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]"
                    />
                  </a>
                </span>
              </h1>
            </div>

            {/* RIGHT: навигация — на той же нижней линии (desktop) */}
            <nav
              className="hidden lg:flex text-[18px] xl:text-[20px] font-bold gap-10 xl:gap-[100px] place-self-end"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.2px' }}
            >
              <Link href="/terms" className="hover:opacity-70 transition-opacity">terms service</Link>
              <Link href="/support" className="hover:opacity-70 transition-opacity">support</Link>
              <Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link>
            </nav>
          </div>

          {/* Мобильный футер — ниже левого блока */}
          <nav
            className="mt-8 lg:hidden flex text-[16px] font-bold gap-8"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.2px' }}
          >
            <Link href="/terms" className="hover:opacity-70 transition-opacity">terms service</Link>
            <Link href="/support" className="hover:opacity-70 transition-opacity">support</Link>
            <Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
