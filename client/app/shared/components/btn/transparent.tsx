import Btn, { IconBtnProps } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";
import Image from "next/image";

type TransparentSize = Omit<IconBtnProps, "size">;
function TransparentBtn({
  size,
  className,
  children,
  width,
  icon = true,
  onClick,
}: IconBtnProps) {
  return (
    <Btn
      size={size}
      width={width}
      className={`${styles.transparent} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon ? (
        <Image
          src="/img/icon/open.svg"
          alt="열기"
          width={16}
          height={16}
          style={{ marginLeft: "6px" }}
        />
      ) : null}
    </Btn>
  );
}

function Large({ children, className, icon, width, onClick }: TransparentSize) {
  const att = {
    className,
    icon,
    width,
    onClick,
  };
  return (
    <TransparentBtn {...att} size="l">
      {children}
    </TransparentBtn>
  );
}
function Medium({
  children,
  className,
  icon,
  width,
  onClick,
}: TransparentSize) {
  const att = {
    className,
    icon,
    width,
    onClick,
  };
  return (
    <TransparentBtn {...att} size="m">
      {children}
    </TransparentBtn>
  );
}
function Regular({
  children,
  className,
  icon,
  width,
  onClick,
}: TransparentSize) {
  const att = {
    className,
    icon,
    width,
    onClick,
  };
  return (
    <TransparentBtn {...att} size="r">
      {children}
    </TransparentBtn>
  );
}
function Small({ children, className, icon, width, onClick }: TransparentSize) {
  const att = {
    className,
    icon,
    width,
    onClick,
  };
  return (
    <TransparentBtn {...att} size="s">
      {children}
    </TransparentBtn>
  );
}

TransparentBtn.Large = Large;
TransparentBtn.Medium = Medium;
TransparentBtn.Regular = Regular;
TransparentBtn.Small = Small;

TransparentBtn.displayName = "Btn.Transparent";
Large.displayName = "Btn.Transparent.Large";
Medium.displayName = "Btn.Transparent.Medium";
Regular.displayName = "Btn.Transparent.Regular";
Small.displayName = "Btn.Transparent.Small";

export default TransparentBtn;
