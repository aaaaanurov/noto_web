const font = { fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' } as const;

type Props = {
  ownerUsername: string;
  className?: string;
};

/**
 * Invite notice shown above a restricted (Specials) wishlist preview.
 * Rendered only for `privacy === 'restricted'`.
 */
export default function InviteBanner({ ownerUsername, className }: Props) {
  return (
    <div
      className={`rounded-[6px] border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 ${className ?? ''}`}
      style={font}
    >
      <p className="text-[13px] font-medium text-black leading-tight">
        You&apos;ve been invited to a special list
      </p>
      <p className="mt-0.5 text-[13px] text-[#545454] leading-tight">
        by @{ownerUsername}
      </p>
    </div>
  );
}
