import { ImageResponse } from 'next/og';
import { supabase, type Profile } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response('Username is required', { status: 400 });
  }

  // Загружаем профиль из public view (anon access)
  const { data: profile } = await supabase
    .from('public_profiles_preview')
    .select('*')
    .eq('username', username)
    .single<Profile>();

  if (!profile) {
    return new Response('Profile not found', { status: 404 });
  }

  const displayName = profile.full_name || profile.username || 'User';

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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Avatar */}
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={username}
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              marginBottom: 40,
              objectFit: 'cover',
              border: '8px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        )}

        {/* Name */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            margin: 0,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {displayName}
        </h1>

        <p
          style={{
            fontSize: 32,
            margin: 0,
            marginBottom: 60,
            opacity: 0.9,
          }}
        >
          @{username}
        </p>

        {/* Bio */}
        {profile.bio && (
          <p
            style={{
              fontSize: 28,
              margin: 0,
              marginBottom: 60,
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: 800,
              padding: '0 40px',
            }}
          >
            {profile.bio}
          </p>
        )}

        {/* Logo */}
        <p
          style={{
            fontSize: 24,
            opacity: 0.7,
            marginTop: 'auto',
            paddingBottom: 40,
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
        'Cache-Control': 'public, max-age=86400', // Кэш на 24 часа
        'Access-Control-Allow-Origin': '*', // CORS для мессенджеров
      },
    }
  );
}

