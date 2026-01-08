import { Metadata } from 'next';
import { supabase, type WishlistPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

  const itemsCount = wishlist.items_count || 0;
  const hasImage = !!wishlist.image_url;
  const coverColor = wishlist.cover_color_hex || '#F7F7F7';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <header className="flex justify-center pt-14 pb-8">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Noto"
            width={96}
            height={47}
            className="h-12 w-auto"
            style={{ filter: 'invert(1)' }}
          />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 px-[50px] pb-32">
        {/* Title */}
        <h1 
          className="text-[30px] font-bold uppercase tracking-[0.03em] leading-none text-black"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {wishlist.name}
        </h1>
        
        {/* Username */}
        <p 
          className="mt-2 text-[20px] text-[#545454]"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          @{wishlist.owner_username}
        </p>

        {/* Cover Image/Color */}
        <div 
          className="mt-8 w-full aspect-square max-w-[340px] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#F7F7F7' }}
        >
          {hasImage ? (
            <img
              src={wishlist.image_url!}
              alt={wishlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div 
              className="w-4/5 h-4/5 flex items-center justify-center text-white font-bold text-lg uppercase tracking-wide"
              style={{ backgroundColor: coverColor }}
            >
              {wishlist.name}
            </div>
          )}
        </div>

        {/* Items count */}
        <p 
          className="mt-6 text-[14px] text-black tracking-[0.03em]"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
        </p>

        {/* Description */}
        {wishlist.description && (
          <p 
            className="mt-4 text-[14px] text-black leading-[1.43] tracking-[0.03em] max-w-[320px]"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            {wishlist.description}
          </p>
        )}
      </main>

      {/* Download Button - Sticky */}
      <a
        href="https://apps.apple.com/app/id6753711015"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 left-0 right-0 h-[54px] bg-black flex items-center justify-center"
      >
        <span 
          className="text-white text-[16px] font-medium"
          style={{ fontFamily: 'Futura, Helvetica Neue, Arial, sans-serif' }}
        >
          download app
        </span>
      </a>
    </div>
  );
}
