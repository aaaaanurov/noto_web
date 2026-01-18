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

  const name = wishlist.name || 'Wishlist';
  const description = wishlist.description || '';
  const itemsCount = wishlist.items_count || 0;
  const ownerUsername = wishlist.owner_username || 'noto';
  const wishlistImage = wishlist.image_url;
  const coverColor = wishlist.cover_color_hex || '#E5E5E5';
  const textColor = wishlist.text_color_hex || '#1A1A1A';
  
  // Logo URL
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Header with Logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 48,
            paddingBottom: 32,
          }}
        >
          <img
            src={logoUrl}
            alt="Noto"
            style={{
              height: 48,
              width: 'auto',
            }}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            paddingLeft: 72,
            paddingRight: 72,
            gap: 64,
          }}
        >
          {/* Left: Text Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop: 16,
              flex: 1,
            }}
          >
            {/* Name - UPPERCASE */}
            <h1
              style={{
                color: '#1A1A1A',
                fontSize: 42,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: 500,
              }}
            >
              {name.length > 35 ? name.slice(0, 35) + '...' : name}
            </h1>
            
            {/* Username + Items count */}
            <span
              style={{
                color: '#545454',
                fontSize: 20,
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              @{ownerUsername} · {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
            </span>
            
            {/* Description */}
            {description && (
              <p
                style={{
                  color: '#1A1A1A',
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  lineHeight: 1.4,
                  margin: 0,
                  marginTop: 28,
                  maxWidth: 420,
                }}
              >
                {description.length > 120 ? description.slice(0, 120) + '...' : description}
              </p>
            )}
          </div>

          {/* Right: Wishlist Cover (image or color with name) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                width: 320,
                height: 400,
                backgroundColor: coverColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Background image if exists */}
              {wishlistImage && (
                <img
                  src={wishlistImage}
                  alt=""
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              
              {/* Dark overlay for better text readability on images */}
              {wishlistImage && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  }}
                />
              )}
              
              {/* Name centered on cover - always visible */}
              <span
                style={{
                  position: 'relative',
                  color: wishlistImage ? '#FFFFFF' : textColor,
                  fontSize: 28,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textAlign: 'center',
                  padding: 24,
                  lineHeight: 1.2,
                  maxWidth: 280,
                  wordBreak: 'break-word',
                }}
              >
                {name.length > 40 ? name.slice(0, 40) + '...' : name}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Download App */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1A1A1A',
            height: 54,
            width: '100%',
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 500,
              fontFamily: 'Futura, Helvetica Neue, Arial, sans-serif',
            }}
          >
            download app
          </span>
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
