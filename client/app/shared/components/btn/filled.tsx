import Image from "next/image";
import Btn, { IconBtnProps } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";

type FilledSizeProps = Omit<IconBtnProps, "size">;

function FilledBtn({
  size,
  className,
  children,
  width,
  onClick,
  icon,
}: IconBtnProps) {
  return (
    <Btn
      size={size}
      onClick={onClick}
      className={`${styles.filled} ${className}`}
      width={width}
    >
      {children}
      {icon ? (
        <Image src="/img/icon/filled.svg" alt="filled" width={24} height={24} />
      ) : null}
    </Btn>
  );
}

function Large({ children, className, width, onClick, icon }: FilledSizeProps) {
  const att = {
    className,
    width,
    icon,
    onClick,
  };
  return (
    <FilledBtn {...att} size="l">
      {children}
    </FilledBtn>
  );
}

function Medium({
  children,
  className,
  width,
  onClick,
  icon,
}: FilledSizeProps) {
  const att = {
    className,
    width,
    icon,
    onClick,
  };
  return (
    <FilledBtn {...att} size="m">
      {children}
    </FilledBtn>
  );
}
function Regular({
  children,
  className,
  width,
  icon,
  onClick,
}: FilledSizeProps) {
  const att = {
    className,
    width,
    icon,
    onClick,
  };
  return (
    <FilledBtn {...att} size="r">
      {children}
    </FilledBtn>
  );
}
function Small({ children, className, width, icon, onClick }: FilledSizeProps) {
  const att = {
    className,
    width,
    icon,
    onClick,
  };
  return (
    <FilledBtn {...att} size="s">
      {children}
    </FilledBtn>
  );
}
function Yellow({ children, className, width, icon = false }: FilledSizeProps) {
  const att = {
    className,
    width,
    icon,
  };
  return (
    <FilledBtn {...att} className={`${className} ${styles.yellow}`} size="r">
      {children}
    </FilledBtn>
  );
}

FilledBtn.Large = Large;
FilledBtn.Medium = Medium;
FilledBtn.Regular = Regular;
FilledBtn.Small = Small;
FilledBtn.Yellow = Yellow;

FilledBtn.displayName = "Btn.Filled";
Large.displayName = "Btn.Filled.Large";
Medium.displayName = "Btn.Filled.Medium";
Regular.displayName = "Btn.Filled.Regular";
Small.displayName = "Btn.Filled.Small";
Yellow.displayName = "Btn.Filled.Yellow";

export default FilledBtn;
