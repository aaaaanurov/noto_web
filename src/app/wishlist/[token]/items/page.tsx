import { Metadata } from 'next';
import { supabase, type WishlistPreview, type WishlistItemPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import InviteBanner from '@/components/InviteBanner';

export const dynamic = 'force-dynamic';

const TOKEN_REGEX = /^[A-Za-z0-9_-]+$/;

type Props = {
  params: Promise<{ token: string }>;
};

async function fetchData(token: string) {
  if (!TOKEN_REGEX.test(token)) return null;

  const [wishlistRes, itemsRes] = await Promise.all([
    supabase.rpc('get_wishlist_preview', { p_token: token }).single<WishlistPreview>(),
    supabase.rpc('get_wishlist_items_preview', { p_token: token }),
  ]);

  if (wishlistRes.error) {
    console.error('[items] wishlist fetch error:', wishlistRes.error);
    return null;
  }

  if (itemsRes.error) {
    console.error('[items] items fetch error:', itemsRes.error);
  }

  return {
    wishlist: wishlistRes.data,
    items: (itemsRes.data as WishlistItemPreview[] | null) ?? [],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const result = await fetchData(token);

  if (!result) {
    return { title: 'Not found - Noto' };
  }

  return {
    title: `${result.wishlist.name} — Items - Noto`,
    description: `Browse items in ${result.wishlist.name} by @${result.wishlist.owner_username}`,
    robots: result.wishlist.privacy !== 'public' ? { index: false, follow: false } : {},
  };
}

function formatPrice(amount: number | null, band: string | null): string {
  if (amount != null && amount > 0) {
    return `$${Math.round(amount)}`;
  }
  if (band) return band;
  return '$';
}

function formatTitle(title: string | null): string | null {
  if (!title) return null;
  if (title.startsWith('http://') || title.startsWith('https://')) {
    try {
      return new URL(title).hostname.replace('www.', '');
    } catch {
      return title;
    }
  }
  return title;
}

const font = { fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' } as const;

export default async function WishlistItemsPage({ params }: Props) {
  const { token } = await params;
  const result = await fetchData(token);

  if (!result) {
    notFound();
  }

  const { wishlist, items } = result;
  const coverColor = wishlist.cover_color_hex || '#FF0002';
  const textColor = wishlist.text_color_hex || '#FFFFFF';
  const hasImage = !!wishlist.image_url;
  const isRestricted = wishlist.privacy === 'restricted';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <header className="flex justify-center pt-10 pb-6">
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

      <main className="flex-1 w-full max-w-[390px] mx-auto pb-32">
        {/* Back */}
        <div className="px-4">
          <Link
            href={`/wishlist/${token}`}
            className="inline-block text-[14px] text-black hover:opacity-60 transition-opacity mb-3"
            style={font}
          >
            ← back
          </Link>
        </div>

        {isRestricted && (
          <div className="px-4 pb-1">
            <InviteBanner ownerUsername={wishlist.owner_username} />
          </div>
        )}

        {/* Header: cover 70x70 + title + meta — matches iOS WishlistDetailView */}
        <div className="px-4 py-3 flex items-start gap-3">
          {/* Cover 70x70, cornerRadius 8 */}
          <div
            className="shrink-0 overflow-hidden flex items-center justify-center"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '8px',
              backgroundColor: hasImage ? undefined : coverColor,
            }}
          >
            {hasImage ? (
              <div className="relative w-full h-full">
                <img
                  src={wishlist.image_url!}
                  alt={wishlist.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center text-center px-1.5 leading-tight"
                  style={{
                    ...font,
                    fontSize: '9px',
                    fontWeight: 700,
                    color: textColor,
                    letterSpacing: '0.36px',
                  }}
                >
                  {wishlist.name.toUpperCase()}
                </span>
              </div>
            ) : (
              <span
                className="text-center px-1.5 leading-tight"
                style={{
                  ...font,
                  fontSize: '9px',
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: '0.36px',
                }}
              >
                {wishlist.name.toUpperCase()}
              </span>
            )}
          </div>

          {/* Title + meta */}
          <div className="flex flex-col gap-1 min-w-0 pt-0.5">
            <h1
              className="text-[16px] font-bold uppercase text-black truncate"
              style={font}
            >
              {wishlist.name}
            </h1>
            <p className="text-[12px] text-gray-400" style={font}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Description — 14px, lineLimit 3, padding h:16 bottom:12 */}
        {wishlist.description && (
          <p
            className="px-4 pb-3 text-[14px] text-black leading-[1.4]"
            style={{
              ...font,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {wishlist.description}
          </p>
        )}

        {items.length > 0 ? (
          <div className="px-4 pt-4 grid grid-cols-2 gap-x-4 gap-y-9">
            {items.map((item) => {
              const price = formatPrice(item.price_amount, item.price_band);
              const title = formatTitle(item.title);

              return (
                <a
                  key={item.id}
                  href="https://apps.apple.com/app/id6753711015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="w-full aspect-[3/4] overflow-hidden rounded bg-[#F5F5F5]">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={title || ''}
                        className="w-full h-full object-contain bg-white"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9C9C9" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 16l5-5 4 4 3-3 6 6" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    <p
                      className="text-[14px] font-medium text-black"
                      style={font}
                    >
                      {price}
                    </p>
                    {title && (
                      <p
                        className="text-[14px] text-black truncate"
                        style={font}
                      >
                        {title}
                      </p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="px-4 mt-8 text-[14px] text-[#999]" style={font}>
            No items yet
          </p>
        )}
      </main>

      {/* Sticky footer */}
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
