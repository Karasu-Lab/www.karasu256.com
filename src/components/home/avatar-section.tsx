import Image from 'next/image';

interface AvatarSectionProps {
  /** Image source of the avatar, e.g. `/icons/kara_su.png`. */
  src: string;
  /** Alternative text for the avatar image. */
  alt: string;
}

/**
 * Tall row inside the content container that shows the avatar image,
 * cropped into a circle, at its centre.
 */
export function AvatarSection({ src, alt }: AvatarSectionProps) {
  return (
    <section className="flex h-64 items-center justify-center sm:h-72">
      <Image src={src} alt={alt} width={600} height={600} priority className="size-48 rounded-full object-cover sm:size-56" />
    </section>
  );
}
