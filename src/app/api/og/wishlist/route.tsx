import { ImageResponse } from 'next/og';
import { supabase, type Wishlist } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response('Token is required', { status: 400 });
  }

  // Загружаем вишлист
  const { data: wishlist } = await supabase
    .from('wishlists')
    .select('*')
    .eq('share_token', token)
    .single<Wishlist>();

  if (!wishlist) {
    return new Response('Wishlist not found', { status: 404 });
  }

  // Загружаем количество айтемов
  const { count: itemsCount } = await supabase
    .from('wishlist_items')
    .select('*', { count: 'exact', head: true })
    .eq('wishlist_id', wishlist.id);

  const coverColor = wishlist.cover_color_hex || '#667eea';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 1200,
          height: 630,
          background: `linear-gradient(135deg, ${coverColor} 0%, #764ba2 100%)`,
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: 60,
        }}
      >
        {/* Cover Image or Color Block */}
        {wishlist.image_url ? (
          <img
            src={wishlist.image_url}
            alt={wishlist.name}
            style={{
              width: 400,
              height: 300,
              objectFit: 'cover',
              borderRadius: 16,
              marginBottom: 40,
              border: '8px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        ) : (
          <div
            style={{
              width: 400,
              height: 300,
              backgroundColor: coverColor,
              borderRadius: 16,
              marginBottom: 40,
              border: '8px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 120,
            }}
          >
            ✨
          </div>
        )}

        {/* Wishlist Name */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            margin: 0,
            marginBottom: 20,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          {wishlist.name}
        </h1>

        {/* Description */}
        {wishlist.description && (
          <p
            style={{
              fontSize: 28,
              margin: 0,
              marginBottom: 30,
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: 900,
            }}
          >
            {wishlist.description}
          </p>
        )}

        {/* Items Count */}
        <p
          style={{
            fontSize: 24,
            opacity: 0.8,
            margin: 0,
          }}
        >
          {itemsCount || 0} items
        </p>

        {/* Logo */}
        <p
          style={{
            fontSize: 20,
            opacity: 0.6,
            marginTop: 'auto',
          }}
        >
          ✨ Noto - Share your wishlists
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

