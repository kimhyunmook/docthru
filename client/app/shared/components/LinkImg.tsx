import Link from "next/link";
import Image from "next/image";

export type LinkImgT = {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function LinkImg({
  href,
  src,
  alt,
  width,
  height,
  className,
  onClick,
  ...props
}: LinkImgT) {
  return (
    <Link
      href={href}
      className={`${className} flexCenter`}
      onClick={onClick}
      {...props}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </Link>
  );
}
