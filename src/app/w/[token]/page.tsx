import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ShortWishlistPage({ params }: Props) {
  const { token } = await params;
  redirect(`/wishlist/${token}`);
}
