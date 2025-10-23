import { Metadata } from 'next';
import { supabase, type Wishlist, type WishlistItem } from '@/lib/supabase';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Генерация OG метаданных
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  
  // Загружаем вишлист по share_token
  const { data: wishlist } = await supabase
    .from('wishlists')
    .select('*')
    .eq('share_token', token)
    .single<Wishlist>();

  if (!wishlist) {
    return {
      title: 'Wishlist not found - Noto',
    };
  }

  const ogImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/og/wishlist?token=${token}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/wishlist/${token}`;

  // Не индексировать unlisted и private вишлисты
  const robots = wishlist.privacy !== 'public' 
    ? { index: false, follow: false }
    : {};

  return {
    title: `${wishlist.name} - Noto`,
    description: wishlist.description || `Check out ${wishlist.name} wishlist on Noto`,
    robots,
    openGraph: {
      title: wishlist.name,
      description: wishlist.description || `Check out ${wishlist.name} wishlist on Noto`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: wishlist.name,
        },
      ],
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

export default async function WishlistPage({ params, searchParams }: Props) {
  const { token } = await params;
  const search = await searchParams;
  
  // Загружаем вишлист
  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .select('*')
    .eq('share_token', token)
    .single<Wishlist>();

  if (error || !wishlist) {
    notFound();
  }

  // Загружаем айтемы вишлиста
  const { data: items } = await supabase
    .from('wishlist_items')
    .select('*, items(*)')
    .eq('wishlist_id', wishlist.id);

  const deepLink = `https://noto.space/wishlist/${token}`;
  const coverColor = wishlist.cover_color_hex || '#667eea';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: `linear-gradient(135deg, ${coverColor} 0%, #764ba2 100%)` }}>
      <main className="flex flex-col gap-8 items-center bg-white rounded-2xl p-12 shadow-2xl max-w-2xl w-full">
        {/* Cover Image or Color */}
        {wishlist.image_url ? (
          <img
            src={wishlist.image_url}
            alt={wishlist.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div 
            className="w-full h-48 rounded-lg"
            style={{ backgroundColor: coverColor }}
          />
        )}

        {/* Wishlist Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 uppercase">{wishlist.name}</h1>
          {wishlist.description && (
            <p className="text-gray-600 mt-4">{wishlist.description}</p>
          )}
        </div>

        {/* Items Preview */}
        {items && items.length > 0 && (
          <div className="w-full">
            <p className="text-sm text-gray-500 mb-4">{items.length} items in this wishlist</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.slice(0, 6).map((item: any) => (
                <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {item.items?.image_url ? (
                    <img 
                      src={item.items.image_url} 
                      alt={item.items.title || 'Item'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full mt-4">
          <a
            href={deepLink}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Open in Noto App
          </a>

          <a
            href="https://apps.apple.com/app/noto"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Download Noto
          </a>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-white opacity-80">
        <p>✨ Noto - Share your wishlists</p>
      </footer>
    </div>
  );
}

