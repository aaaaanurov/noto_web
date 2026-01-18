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

          {/* Right: Wishlist Image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}
          >
            {wishlistImage ? (
              <div
                style={{
                  width: 320,
                  height: 400,
                  backgroundColor: '#F7F7F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={wishlistImage}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 320,
                  height: 400,
                  backgroundColor: '#F7F7F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="1"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            )}
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
