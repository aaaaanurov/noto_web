import { Metadata } from 'next';
import { supabase, type WishlistPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';

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
  const coverColor = wishlist.cover_color_hex || '#667eea';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: `linear-gradient(135deg, ${coverColor} 0%, #764ba2 100%)` }}>
      <main className="flex flex-col gap-8 items-center bg-white rounded-2xl p-12 shadow-2xl max-w-2xl w-full">
        {wishlist.image_url ? (
          <img src={wishlist.image_url} alt={wishlist.name} className="w-full h-48 object-cover rounded-lg" />
        ) : (
          <div className="w-full h-48 rounded-lg" style={{ backgroundColor: coverColor }} />
        )}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 uppercase">{wishlist.name}</h1>
          {wishlist.description && <p className="text-gray-600 mt-4">{wishlist.description}</p>}
          {wishlist.items_count > 0 && <p className="text-sm text-gray-500 mt-2">{wishlist.items_count} items</p>}
        </div>

        {wishlist.owner_username && <p className="text-gray-500">by @{wishlist.owner_username}</p>}

        <div className="flex flex-col gap-4 w-full mt-4">
          <a href={deepLink} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            Open in Noto App
          </a>
          <a href="https://apps.apple.com/app/id6753711015" target="_blank" rel="noopener noreferrer" className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            Download Noto
          </a>
        </div>
      </main>
      <footer className="mt-8 text-center text-sm text-white opacity-80"><p>Noto - Share your wishlists</p></footer>
    </div>
  );
}
