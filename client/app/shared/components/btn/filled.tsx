import Image from "next/image";
import Btn, { BtnT, IconBtnT } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";

type FilledSize = Omit<IconBtnT, "size">;

function FilledBtn({
  size,
  className,
  children,
  width,
  icon = false,
}: IconBtnT) {
  return (
    <Btn size={size} className={`${styles.filled} ${className}`} width={width}>
      {children}
      {icon ? (
        <Image src="/img/icon/filled.svg" alt="filled" width={24} height={24} />
      ) : null}
    </Btn>
  );
}

function Large({ children, className, width, icon = false }: FilledSize) {
  const att = {
    className,
    width,
    icon,
  };
  return (
    <FilledBtn {...att} size="l">
      {children}
    </FilledBtn>
  );
}
function Medium({ children, className, width, icon = false }: FilledSize) {
  const att = {
    className,
    width,
    icon,
  };
  return (
    <FilledBtn {...att} size="m">
      {children}
    </FilledBtn>
  );
}
function Regular({ children, className, width, icon = false }: FilledSize) {
  const att = {
    className,
    width,
    icon,
  };
  return (
    <FilledBtn {...att} size="r">
      {children}
    </FilledBtn>
  );
}
function Small({ children, className, width, icon = false }: FilledSize) {
  const att = {
    className,
    width,
    icon,
  };
  return (
    <FilledBtn {...att} size="s">
      {children}
    </FilledBtn>
  );
}
function Yellow({ children, className, width, icon = false }: IconBtnT) {
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

export default FilledBtn;
