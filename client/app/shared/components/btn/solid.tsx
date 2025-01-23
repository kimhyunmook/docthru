import Btn, { BtnT } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";
import Image from "next/image";
type SolidProps = BtnT & {
  icon?: string;
};
type SolidSize = Omit<SolidProps, "size">;

function SolidBtn({ size, className, children, width, icon }: SolidProps) {
  return (
    <Btn size={size} width={width} className={`${styles.solid} ${className}`}>
      {children}
      {!!icon && (
        <Image
          className={styles.img}
          src={icon}
          alt="icon"
          width={24}
          height={24}
        />
      )}
    </Btn>
  );
}

function Large({ children, className, width, icon }: SolidSize) {
  const att = { className, width, icon };
  return (
    <SolidBtn {...att} size="l">
      {children}
    </SolidBtn>
  );
}
function Medium({ children, className, width, icon }: SolidSize) {
  const att = { className, width, icon };
  return (
    <SolidBtn {...att} size="m">
      {children}
    </SolidBtn>
  );
}
function Regular({ children, className, width, icon }: SolidSize) {
  const att = { className, width, icon };
  return (
    <SolidBtn {...att} size="r">
      {children}
    </SolidBtn>
  );
}
function Small({ children, className, width, icon }: SolidSize) {
  const att = { className, width, icon };
  return (
    <SolidBtn {...att} size="s">
      {children}
    </SolidBtn>
  );
}

SolidBtn.Large = Large;
SolidBtn.Medium = Medium;
SolidBtn.Regular = Regular;
SolidBtn.Small = Small;

export default SolidBtn;
