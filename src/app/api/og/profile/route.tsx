import { ImageResponse } from 'next/og';
import { supabase, type Profile } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response('Username is required', { status: 400 });
  }

  const { data: profile } = await supabase
    .rpc('get_profile_preview', { p_username: username })
    .single<Profile>();

  if (!profile) {
    return new Response('Profile not found', { status: 404 });
  }

  const displayName = profile.full_name || profile.username || 'User';
  const bio = profile.bio || '';
  const avatarUrl = profile.avatar_url;
  
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
              }}
            >
              {displayName.length > 30 ? displayName.slice(0, 30) + '...' : displayName}
            </h1>
            
            {/* Username */}
            <span
              style={{
                color: '#545454',
                fontSize: 24,
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              @{username}
            </span>
            
            {/* Bio */}
            {bio && (
              <p
                style={{
                  color: '#1A1A1A',
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  lineHeight: 1.4,
                  margin: 0,
                  marginTop: 28,
                  maxWidth: 400,
                }}
              >
                {bio.length > 120 ? bio.slice(0, 120) + '...' : bio}
              </p>
            )}
          </div>

          {/* Right: Avatar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                style={{
                  width: 320,
                  height: 400,
                  objectFit: 'cover',
                  backgroundColor: '#F7F7F7',
                }}
              />
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
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 10-16 0" />
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
