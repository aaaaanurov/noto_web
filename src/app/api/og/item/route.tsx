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
  const wishlistName = item.wishlist_name || '';
  const price = item.price_amount;
  
  // Изображение айтема или дефолт
  const itemImage = item.image_url;
  const bgImage = itemImage || `${process.env.NEXT_PUBLIC_APP_URL}/images/hero-background.png`;
  
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
            top: itemImage ? -100 : 0,
            left: 0,
            width: 1200,
            height: itemImage ? 830 : 630,
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
            background: 'linear-gradient(270deg, rgba(26, 26, 26, 0.15) 0%, rgba(26, 26, 26, 0.9) 100%)',
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
              gap: 24,
              marginTop: 72,
              maxWidth: 650,
            }}
          >
            {/* Title */}
            <h1
              style={{
                color: '#FFFFFF',
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title.length > 60 ? title.slice(0, 60) + '...' : title}
            </h1>
            
            {/* Description */}
            {description && (
              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: 28,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  lineHeight: 1.3,
                  margin: 0,
                  opacity: 0.9,
                  maxWidth: 600,
                }}
              >
                {description.length > 100 ? description.slice(0, 100) + '...' : description}
              </p>
            )}
            
            {/* Price if available */}
            {price && (
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: 36,
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                ${price}
              </span>
            )}
            
            {/* Meta: wishlist + author */}
            <span
              style={{
                color: '#B3B3B3',
                fontSize: 28,
                fontWeight: 400,
                lineHeight: 1.2,
                marginTop: 8,
              }}
            >
              {wishlistName ? `From "${wishlistName}" ` : ''}by @{ownerUsername}
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

