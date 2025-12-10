import { Metadata } from 'next';
import { supabase, type Profile } from '@/lib/supabase';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Генерация OG метаданных
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  
  // Загружаем профиль из public view (anon access)
  const { data: profile } = await supabase
    .from('public_profiles_preview')
    .select('*')
    .eq('username', username)
    .single<Profile>();

  if (!profile) {
    return {
      title: 'Profile not found - Noto',
    };
  }

  const displayName = profile.full_name || profile.username || 'User';
  const ogImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/og/profile?username=${username}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${username}`;

  return {
    title: `${displayName} - Noto`,
    description: profile.bio || `Check out ${displayName}&#39;s profile on Noto`,
    openGraph: {
      title: displayName,
      description: profile.bio || `Check out ${displayName}&#39;s profile on Noto`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: displayName,
        },
      ],
      url: canonicalUrl,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: displayName,
      description: profile.bio || `Check out ${displayName}&#39;s profile on Noto`,
      images: [ogImageUrl],
      creator: `@${username}`,
    },
  };
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const search = await searchParams;
  
  // Загружаем профиль из public view (anon access)
  const { data: profile, error } = await supabase
    .from('public_profiles_preview')
    .select('*')
    .eq('username', username)
    .single<Profile>();

  if (error || !profile) {
    notFound();
  }

  const displayName = profile.full_name || profile.username || 'User';
  const deepLink = `https://noto.space/profile/${username}`;

  // Парсим UTM параметры для аналитики
  const utmSource = search.utm_source;
  const utmCampaign = search.utm_campaign;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-500 to-pink-500">
      <main className="flex flex-col gap-8 items-center bg-white rounded-2xl p-12 shadow-2xl max-w-md">
        {/* Avatar */}
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
          />
        )}

        {/* Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">{displayName}</h1>
          <p className="text-gray-500 mt-2">@{username}</p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-center text-gray-700 max-w-sm">{profile.bio}</p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full mt-4">
          <a
            href={deepLink}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Open in Noto App
          </a>

          <a
            href="https://apps.apple.com/app/noto"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Download Noto
          </a>
        </div>

        {/* Debug UTM (только в dev) */}
        {process.env.NODE_ENV === 'development' && (utmSource || utmCampaign) && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
            <p>UTM Source: {utmSource}</p>
            <p>UTM Campaign: {utmCampaign}</p>
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-sm text-white">
        <p>✨ Noto - Share your wishlists</p>
      </footer>
    </div>
  );
}

