import { ImageResponse } from 'next/og';
import { supabase, type WishlistPreview } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response('Token is required', { status: 400 });
  }

  const { data: wishlist } = await supabase
    .rpc('get_wishlist_preview', { p_token: token })
    .single<WishlistPreview>();

  if (!wishlist) {
    return new Response('Wishlist not found', { status: 404 });
  }

  const itemsCount = wishlist.items_count || 0;
  const ownerUsername = wishlist.owner_username || 'noto';
  const description = wishlist.description || '';
  
  // Фоновое изображение вишлиста или дефолт
  const bgImage = wishlist.image_url || `${process.env.NEXT_PUBLIC_APP_URL}/images/hero-background.png`;
  
  // Иконка приложения
  const appIconUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/app-icon.png`;
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Background Image */}
        <img
          src={bgImage}
          alt=""
          style={{
            position: 'absolute',
            top: -200,
            left: 0,
            width: 1200,
            height: 1000,
            objectFit: 'cover',
          }}
        />
        
        {/* Gradient Overlay - dark on left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: 'linear-gradient(270deg, rgba(26, 26, 26, 0.1) 0%, rgba(26, 26, 26, 0.85) 100%)',
          }}
        />
        
        {/* Content Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 72,
          }}
        >
          {/* Header: App Icon + Logo + Text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            {/* App Icon with Logo inside */}
            <div
              style={{
                width: 80,
                height: 80,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={appIconUrl}
                alt=""
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 19,
                }}
              />
              <img
                src={logoUrl}
                alt=""
                style={{
                  position: 'absolute',
                  width: 50,
                  height: 'auto',
                }}
              />
            </div>
            
            {/* "Ultimate wishlist" text */}
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 25,
                letterSpacing: '0.03em',
              }}
            >
              Ultimate wishlist
            </span>
          </div>
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              marginTop: 72,
              maxWidth: 650,
            }}
          >
            {/* Title - UPPERCASE */}
            <h1
              style={{
                color: '#FFFFFF',
                fontSize: 56,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1,
                margin: 0,
              }}
            >
              {wishlist.name}
            </h1>
            
            {/* Description */}
            {description && (
              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: 32,
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  lineHeight: 1.25,
                  margin: 0,
                  maxWidth: 615,
                }}
              >
                {description.length > 120 ? description.slice(0, 120) + '...' : description}
              </p>
            )}
            
            {/* Meta: items count + author */}
            <span
              style={{
                color: '#B3B3B3',
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {itemsCount} {itemsCount === 1 ? 'item' : 'items'} by @{ownerUsername}
            </span>
          </div>
        </div>
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
