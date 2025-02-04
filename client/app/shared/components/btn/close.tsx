import { PropsWithClassName } from "../../types/common";
import s from "@/app/shared/styles/btn.module.css";
interface CloseBtnProps extends PropsWithClassName {
  width: number;
  height: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function CloseBtn({
  className,
  width,
  height,
  onClick,
}: CloseBtnProps) {
  return (
    <button
      className={`${s.closeBtn} ${className}`}
      style={{ width, height }}
      onClick={onClick}
    ></button>
  );
}

// CloseBtn.displayName = 'Cl'
