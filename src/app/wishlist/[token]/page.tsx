import { Metadata } from 'next';
import { supabase, type WishlistPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import InviteBanner from '@/components/InviteBanner';

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

  const isRestricted = wishlist.privacy === 'restricted';
  const pageTitle = isRestricted
    ? `You're invited · ${wishlist.name} — Noto`
    : `${wishlist.name} - Noto`;
  const ogTitle = isRestricted ? `You're invited · ${wishlist.name}` : wishlist.name;
  const description = isRestricted
    ? `@${wishlist.owner_username} invited you to a special list on Noto`
    : wishlist.description || `Check out ${wishlist.name} wishlist on Noto`;

  return {
    title: pageTitle,
    description,
    robots,
    openGraph: {
      title: ogTitle,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: wishlist.name }],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
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
  const textColor = wishlist.text_color_hex || '#FFFFFF';
  const isBadge = wishlist.text_label_style === 'badge';
  const badgeBg = textColor.toLowerCase() === '#ffffff' ? '#000000' : '#FFFFFF';
  const isRestricted = wishlist.privacy === 'restricted';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <header className="flex justify-center pt-10 pb-8">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Noto"
            width={96}
            height={47}
            className="h-12 w-auto"
            style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(67%) saturate(5765%) hue-rotate(358deg) brightness(93%) contrast(112%)' }}
          />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 px-[50px] pb-32">
        {isRestricted && (
          <InviteBanner ownerUsername={wishlist.owner_username} className="mb-5" />
        )}
        <h1 
          className="text-[25px] leading-none text-black"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          <span className="font-bold uppercase tracking-[0.03em]">{wishlist.name}</span>
          <span className="font-normal text-[15px] text-[#545454] ml-1.5 tracking-normal normal-case">wishlist</span>
        </h1>
        <p 
          className="mt-[5px] text-[15px] text-[#545454]"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          by @{wishlist.owner_username}
        </p>

        {/* Cover Image/Color — 163:216 ratio, matching iOS app */}
        <div 
          className="mt-[20px] w-full max-w-[340px] overflow-hidden relative"
          style={{
            aspectRatio: '163 / 216',
            borderRadius: '2px',
            border: '1px solid #8C0000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          {hasImage && (
            <img
              src={wishlist.image_url!}
              alt={wishlist.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div 
            className="absolute inset-0 flex items-center justify-center font-bold text-lg uppercase tracking-wide"
            style={{ backgroundColor: hasImage ? undefined : coverColor }}
          >
            <span
              style={{
                color: textColor,
                ...(isBadge && { backgroundColor: badgeBg, padding: '4px 8px' }),
              }}
            >
              {wishlist.name}
            </span>
          </div>
        </div>

        {itemsCount > 0 && (
          <Link
            href={`/wishlist/${wishlist.share_token}/items`}
            className="mt-6 inline-flex items-center gap-2 text-[#8C0000] text-[14px] font-medium tracking-[0.03em] underline decoration-[1.5px] underline-offset-[3px] hover:opacity-60 transition-opacity"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            show {itemsCount} {itemsCount === 1 ? 'item' : 'items'} →
          </Link>
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
          {isRestricted ? 'open in Noto to save this list' : 'download app'}
        </span>
      </a>
    </div>
  );
}
