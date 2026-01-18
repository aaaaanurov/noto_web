import { ImageResponse } from 'next/og';
import { supabase, type ItemPreview } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Item ID is required', { status: 400 });
  }

  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    return new Response('Invalid item ID', { status: 400 });
  }

  const { data: item } = await supabase
    .rpc('get_item_preview', { p_item_id: itemId })
    .single<ItemPreview>();

  if (!item) {
    return new Response('Item not found', { status: 404 });
  }

  const title = item.title || 'Item';
  const description = item.description || '';
  const ownerUsername = item.owner_username || 'noto';
  const price = item.price_amount;
  const itemImage = item.image_url;
  
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
            {/* Title - UPPERCASE */}
            <h1
              style={{
                color: '#1A1A1A',
                fontSize: 36,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: 500,
              }}
            >
              {title.length > 50 ? title.slice(0, 50) + '...' : title}
            </h1>
            
            {/* Username */}
            <span
              style={{
                color: '#545454',
                fontSize: 20,
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              @{ownerUsername}
            </span>
            
            {/* Price */}
            {price && (
              <span
                style={{
                  color: '#1A1A1A',
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  marginTop: 24,
                }}
              >
                $ {price}
              </span>
            )}
            
            {/* Description */}
            {description && (
              <p
                style={{
                  color: '#1A1A1A',
                  fontSize: 20,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  lineHeight: 1.4,
                  margin: 0,
                  marginTop: 20,
                  maxWidth: 420,
                }}
              >
                {description.length > 100 ? description.slice(0, 100) + '...' : description}
              </p>
            )}
          </div>

          {/* Right: Item Image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}
          >
            {itemImage ? (
              <div
                style={{
                  width: 380,
                  height: 380,
                  backgroundColor: '#F7F7F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={itemImage}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 380,
                  height: 380,
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
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
