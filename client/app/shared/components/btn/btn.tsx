"use client";
import styles from "../../styles/btn.module.css";
import FilledBtn from "./filled";
import OutlineBtn from "./outline";
import TransparentBtn from "./transparent";
import SolidBtn from "./solid";
import { PropsWithClassName } from "../../types/common";
import { ButtonHTMLAttributes, useEffect, useCallback } from "react";

export type BtnProps = PropsWithClassName &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    width?: number | string;
    height?: number | string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
    size: "l" | "m" | "r" | "s";
    enter?: boolean;
  };
export type IconBtnProps = BtnProps & { icon?: boolean };

function Btn({
  children = "거절하기",
  className,
  onClick,
  size = "l",
  width,
  enter = false,
}: BtnProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Enter" && onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  useEffect(() => {
    if (enter) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown, enter]);
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
