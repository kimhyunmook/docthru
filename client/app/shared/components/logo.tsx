import { PropsWithClassName } from "../types/common";
import LinkImg from "./LinkImg";
interface LogoProps extends PropsWithClassName {
  width: number;
  height: number;
  href: string;
}
export default function Logo({
  className,
  width,
  height,
  href = "/",
}: LogoProps) {
  return (
    <LinkImg
      className={className}
      src="/img/logo.svg"
      alt="로고"
      width={width}
      height={height}
      href={href}
    />
  );
}
