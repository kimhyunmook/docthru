import Btn, { BtnT } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";

type SolidSize = Omit<BtnT, "size">;

function SolidBtn({ size, className, children, width }: BtnT) {
  return (
    <Btn size={size} width={width} className={`${styles.solid} ${className}`}>
      {children}
    </Btn>
  );
}

function Large({ children, className, width = "auto" }: SolidSize) {
  return (
    <SolidBtn className={className} width={width} size="l">
      {children}
    </SolidBtn>
  );
}
function Medium({ children, className, width }: SolidSize) {
  const att = { className, width };
  return (
    <SolidBtn {...att} size="m">
      {children}
    </SolidBtn>
  );
}
function Regular({ children, className, width }: SolidSize) {
  const att = { className, width };
  return (
    <SolidBtn {...att} size="r">
      {children}
    </SolidBtn>
  );
}
function Small({ children, className, width }: SolidSize) {
  const att = { className, width };
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
