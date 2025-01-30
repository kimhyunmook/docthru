import { PropsWithClassName } from "../../types/common";
import s from "@/app/shared/styles/btn.module.css";
interface CloseBtnProps extends PropsWithClassName {
  width: number;
  height: number;
}
export default function CloseBtn({ className, width, height }: CloseBtnProps) {
  return (
    <button
      className={`${s.closeBtn} ${className}`}
      style={{ width, height }}
    ></button>
  );
}

// CloseBtn.displayName = 'Cl'
