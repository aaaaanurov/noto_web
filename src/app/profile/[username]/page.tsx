import { Metadata } from 'next';
import { supabase, type Profile } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  
  const { data: profile } = await supabase
    .rpc('get_profile_preview', { p_username: username })
    .single<Profile>();

  if (!profile) {
    return { title: 'Profile not found - Noto' };
  }

  const displayName = profile.full_name || profile.username || 'User';
  const ogImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/og/profile?username=${username}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${username}`;

  return {
    title: `${displayName} - Noto`,
    description: profile.bio || `Check out ${displayName} on Noto`,
    openGraph: {
      title: displayName,
      description: profile.bio || `Check out ${displayName} on Noto`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: displayName }],
      url: canonicalUrl,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: displayName,
      description: profile.bio || `Check out ${displayName} on Noto`,
      images: [ogImageUrl],
      creator: `@${username}`,
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  
  const { data: profile, error } = await supabase
    .rpc('get_profile_preview', { p_username: username })
    .single<Profile>();

  if (error || !profile) {
    notFound();
  }

  const displayName = profile.full_name || profile.username || 'User';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <header className="flex justify-center pt-10 pb-8">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Noto"
            width={96}
            height={47}
            className="h-12 w-auto"
            style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(67%) saturate(5765%) hue-rotate(358deg) brightness(93%) contrast(112%)' }}
          />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 px-[50px] pb-32">
        {/* Name */}
        <h1 
          className="text-[25px] font-bold uppercase tracking-[0.03em] leading-none text-black"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {displayName}
        </h1>
        
        {/* Username */}
        <p 
          className="mt-[5px] text-[15px] text-[#545454]"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          @{username}
        </p>

        {/* Avatar */}
        {profile.avatar_url && (
          <div 
            className="mt-[20px] w-full max-w-[280px] aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: '#F7F7F7' }}
          >
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Bio */}
        {profile.bio && (
          <p 
            className="mt-6 text-[14px] text-black leading-[1.43] tracking-[0.03em] max-w-[320px]"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            {profile.bio}
          </p>
        )}
      </main>

      {/* Download Button - Sticky */}
      <a
        href="https://apps.apple.com/app/id6753711015"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 left-0 right-0 h-[54px] bg-black flex items-center justify-center"
      >
        <span 
          className="text-white text-[16px] font-medium"
          style={{ fontFamily: 'Futura, Helvetica Neue, Arial, sans-serif' }}
        >
          download app
        </span>
      </a>
    </div>
  );
}
