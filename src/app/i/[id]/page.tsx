import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const itemId = parseInt(id, 10);
  
  if (isNaN(itemId)) return { title: 'Item not found - Noto' };

  const { data: item } = await supabase.rpc('get_item_preview', { p_item_id: itemId }).single();

  if (!item) return { title: 'Item not found - Noto' };

  return {
    title: `${item.title} - Noto`,
    description: item.description || `Check out ${item.title} on Noto`,
    openGraph: {
      title: item.title,
      description: item.description || `Check out ${item.title} on Noto`,
      images: item.image_url ? [{ url: item.image_url, width: 1200, height: 630 }] : [],
      url: `${process.env.NEXT_PUBLIC_APP_URL}/i/${id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description || `Check out ${item.title} on Noto`,
      images: item.image_url ? [item.image_url] : [],
    },
  };
}

export default async function ItemPage({ params }: Props) {
  const { id } = await params;
  const itemId = parseInt(id, 10);

  if (isNaN(itemId)) notFound();

  const { data: item, error } = await supabase.rpc('get_item_preview', { p_item_id: itemId }).single();

  if (error || !item) notFound();

  const deepLink = `noto://item/${id}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-500 to-pink-500">
      <main className="flex flex-col gap-6 items-center bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
        ) : (
          <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>
          {item.description && <p className="text-gray-600 mt-2 text-sm">{item.description}</p>}
        </div>

        {item.wishlist_name && <p className="text-gray-500 text-sm">From "{item.wishlist_name}" by @{item.owner_username}</p>}
        {item.price_amount && <p className="text-lg font-semibold text-purple-600">${item.price_amount}</p>}

        <div className="flex flex-col gap-3 w-full mt-4">
          <a href={deepLink} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors">Open in Noto App</a>
          <a href="https://apps.apple.com/app/id6753711015" target="_blank" rel="noopener noreferrer" className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg text-center transition-colors">Download Noto</a>
        </div>
      </main>
      <footer className="mt-8 text-center text-sm text-white opacity-80"><p>Noto - Share your wishlists</p></footer>
    </div>
  );
}
