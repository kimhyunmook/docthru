import Btn, { IconBtnT } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";
import Image from "next/image";

type TransparentSize = Omit<IconBtnT, "size">;
function TransparentBtn({
  size,
  className,
  children,
  width,
  icon = true,
}: IconBtnT) {
  return (
    <Btn
      size={size}
      width={width}
      className={`${styles.transparent} ${className}`}
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

function Large({ children, className, icon, width }: TransparentSize) {
  const att = {
    className,
    icon,
    width,
  };
  return (
    <TransparentBtn {...att} size="l">
      {children}
    </TransparentBtn>
  );
}
function Medium({ children, className, icon, width }: TransparentSize) {
  const att = {
    className,
    icon,
    width,
  };
  return (
    <TransparentBtn {...att} size="m">
      {children}
    </TransparentBtn>
  );
}
function Regular({ children, className, icon, width }: TransparentSize) {
  const att = {
    className,
    icon,
    width,
  };
  return (
    <TransparentBtn {...att} size="r">
      {children}
    </TransparentBtn>
  );
}
function Small({ children, className, icon, width }: TransparentSize) {
  const att = {
    className,
    icon,
    width,
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

export default TransparentBtn;
