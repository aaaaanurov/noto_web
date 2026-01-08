import { Metadata } from 'next';
import { supabase, type ItemPreview } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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
        {/* Title */}
        <h1 
          className="text-[25px] font-bold uppercase tracking-[0.03em] leading-none text-black"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {item.title}
        </h1>
        
        {/* Username */}
        <p 
          className="mt-[5px] text-[15px] text-[#545454]"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          @{item.owner_username}
        </p>

        {/* Item Image */}
        <div 
          className="mt-[20px] w-full max-w-[340px] aspect-square flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#F7F7F7' }}
        >
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Price */}
        {item.price_amount && (
          <p 
            className="mt-4 text-[13px] font-medium text-black tracking-[0.03em]"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            $ {item.price_amount}
          </p>
        )}

        {/* Description */}
        {item.description && (
          <p 
            className="mt-4 text-[14px] text-black leading-[1.43] tracking-[0.03em] max-w-[320px]"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            {item.description}
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
