import { Metadata } from 'next';
import { supabase, type WishlistPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  
  const { data: wishlist } = await supabase
    .rpc('get_wishlist_preview', { p_token: token })
    .single<WishlistPreview>();

  if (!wishlist) {
    return { title: 'Wishlist not found - Noto' };
  }

  const ogImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/og/wishlist?token=${token}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/wishlist/${token}`;
  const robots = wishlist.privacy !== 'public' ? { index: false, follow: false } : {};

  return {
    title: `${wishlist.name} - Noto`,
    description: wishlist.description || `Check out ${wishlist.name} wishlist on Noto`,
    robots,
    openGraph: {
      title: wishlist.name,
      description: wishlist.description || `Check out ${wishlist.name} wishlist on Noto`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: wishlist.name }],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: wishlist.name,
      description: wishlist.description || `Check out ${wishlist.name} wishlist on Noto`,
      images: [ogImageUrl],
    },
  };
}

export default async function WishlistPage({ params }: Props) {
  const { token } = await params;
  
  const { data: wishlist, error } = await supabase
    .rpc('get_wishlist_preview', { p_token: token })
    .single<WishlistPreview>();

  if (error || !wishlist) {
    notFound();
  }

  const deepLink = `noto://wishlist/${token}`;
  const itemsCount = wishlist.items_count || 0;

  return (
    <div
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
      style={{
        backgroundImage: wishlist.image_url ? `url(${wishlist.image_url})` : 'url(/images/hero-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(270deg, rgba(26, 26, 26, 0.1) 0%, rgba(26, 26, 26, 0.92) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col p-8 sm:p-12 lg:p-[72px]">
        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src="/images/app-icon.png"
              alt="Noto"
              width={80}
              height={80}
              className="rounded-[19px]"
            />
            <Image
              src="/images/logo.png"
              alt=""
              width={50}
              height={27}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-[50px]"
            />
          </div>
          <span 
            className="text-white text-lg sm:text-[25px] tracking-wide"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.03em' }}
          >
            Ultimate wishlist
          </span>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mt-8 sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-7">
            {/* Title - UPPERCASE */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-[56px] font-bold uppercase leading-none"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.03em' }}
            >
              {wishlist.name}
            </h1>
            
            {/* Description */}
            {wishlist.description && (
              <p 
                className="text-lg sm:text-xl lg:text-[32px] leading-relaxed max-w-xl"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.03em', lineHeight: 1.25 }}
              >
                {wishlist.description}
              </p>
            )}
            
            {/* Meta */}
            <p 
              className="text-[#B3B3B3] text-lg sm:text-xl lg:text-[32px]"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              {itemsCount} {itemsCount === 1 ? 'item' : 'items'} by @{wishlist.owner_username}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 sm:mt-12">
            <a
              href={deepLink}
              className="px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors text-center"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              Open in Noto
            </a>
            <a
              href="https://apps.apple.com/app/id6753711015"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-colors text-center"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              Download App
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-8">
          <p className="text-white/60 text-sm" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            Noto — your ultimate wishlist
          </p>
        </div>
      </div>
    </div>
  );
}
