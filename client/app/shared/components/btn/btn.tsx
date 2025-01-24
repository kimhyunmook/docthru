"use client";
import styles from "../../styles/btn.module.css";
import FilledBtn from "./filled";
import OutlineBtn from "./outline";
import TransparentBtn from "./transparent";
import SolidBtn from "./solid";
import { PropsWithClassName } from "../../types/common";
import { ButtonHTMLAttributes } from "react";

export type BtnProps = PropsWithClassName &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    width?: number | string;
    height?: number | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size: "l" | "m" | "r" | "s";
  };
export type IconBtnProps = BtnProps & { icon?: boolean };

function Btn({
  children = "거절하기",
  className,
  onClick,
  size = "l",
  width,
}: BtnProps) {
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${className}`}
      style={{
        maxWidth: width,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Btn.Filled = FilledBtn;
Btn.Outline = OutlineBtn;
Btn.Transparent = TransparentBtn;
Btn.Solid = SolidBtn;



export default Btn;
