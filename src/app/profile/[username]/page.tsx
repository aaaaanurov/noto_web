import { Metadata } from 'next';
import { supabase, type Profile } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
  const deepLink = `noto://profile/${username}`;

  return (
    <div
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(270deg, rgba(26, 26, 26, 0.3) 0%, rgba(26, 26, 26, 0.95) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col p-8 sm:p-12 lg:p-[72px]">
        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src="/images/app-icon.png"
              alt="Noto"
              width={80}
              height={80}
              className="rounded-[19px]"
            />
            <Image
              src="/images/logo.png"
              alt=""
              width={50}
              height={27}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-[50px]"
            />
          </div>
          <span 
            className="text-white text-lg sm:text-[25px] tracking-wide"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.03em' }}
          >
            Ultimate wishlist
          </span>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mt-8 sm:mt-0">
          <div className="flex items-start gap-8 sm:gap-12">
            {/* Avatar */}
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="w-28 h-28 sm:w-40 sm:h-40 lg:w-[180px] lg:h-[180px] rounded-full object-cover border-4 border-white/20 flex-shrink-0"
              />
            )}
            
            {/* Text Content */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Name - UPPERCASE */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-[56px] font-bold uppercase leading-none"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.03em' }}
              >
                {displayName}
              </h1>
              
              {/* Username */}
              <p 
                className="text-[#B3B3B3] text-lg sm:text-xl lg:text-[32px]"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
              >
                @{username}
              </p>
              
              {/* Bio */}
              {profile.bio && (
                <p 
                  className="text-white/90 text-base sm:text-lg lg:text-[28px] leading-relaxed max-w-lg mt-2"
                  style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.02em', lineHeight: 1.3 }}
                >
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 sm:mt-12">
            <a
              href={deepLink}
              className="px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors text-center"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              Open in Noto
            </a>
            <a
              href="https://apps.apple.com/app/id6753711015"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-colors text-center"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              Download App
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-8">
          <p className="text-white/60 text-sm" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            Noto — your ultimate wishlist
          </p>
        </div>
      </div>
    </div>
  );
}
