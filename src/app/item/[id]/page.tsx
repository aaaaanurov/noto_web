import { Metadata } from 'next';
import { supabase, type ItemPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const itemId = parseInt(id, 10);
  
  if (isNaN(itemId)) return { title: 'Item not found - Noto' };

  const { data: item } = await supabase
    .rpc('get_item_preview', { p_item_id: itemId })
    .single<ItemPreview>();

  if (!item) return { title: 'Item not found - Noto' };

  const ogImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/og/item?id=${id}`;

  return {
    title: `${item.title} - Noto`,
    description: item.description || `Check out ${item.title} on Noto`,
    openGraph: {
      title: item.title,
      description: item.description || `Check out ${item.title} on Noto`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: item.title }],
      url: `${process.env.NEXT_PUBLIC_APP_URL}/item/${id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description || `Check out ${item.title} on Noto`,
      images: [ogImageUrl],
    },
  };
}

export default async function ItemPage({ params }: Props) {
  const { id } = await params;
  const itemId = parseInt(id, 10);

  if (isNaN(itemId)) notFound();

  const { data: item, error } = await supabase
    .rpc('get_item_preview', { p_item_id: itemId })
    .single<ItemPreview>();

  if (error || !item) notFound();

  const deepLink = `noto://item/${id}`;

  return (
    <div
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
      style={{
        backgroundImage: item.image_url ? `url(${item.image_url})` : 'url(/images/hero-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(270deg, rgba(26, 26, 26, 0.2) 0%, rgba(26, 26, 26, 0.95) 100%)',
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
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Title */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-[52px] font-bold leading-tight"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.02em' }}
            >
              {item.title}
            </h1>
            
            {/* Description */}
            {item.description && (
              <p 
                className="text-lg sm:text-xl lg:text-[28px] leading-relaxed opacity-90 max-w-xl"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.02em' }}
              >
                {item.description}
              </p>
            )}
            
            {/* Price */}
            {item.price_amount && (
              <p className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
                ${item.price_amount}
              </p>
            )}
            
            {/* Meta */}
            <p 
              className="text-[#B3B3B3] text-lg sm:text-xl lg:text-[28px]"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              {item.wishlist_name ? `From "${item.wishlist_name}" ` : ''}by @{item.owner_username}
            </p>
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
