import Btn, { BtnProps } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";
import Image from "next/image";
type SolidProps = BtnProps & {
  icon?: string;
};
type SolidSize = Omit<SolidProps, "size">;

function SolidBtn({
  size,
  className,
  children,
  width,
  icon,
  onClick,
  enter,
}: SolidProps) {
  return (
    <Btn
      size={size}
      onClick={onClick}
      width={width}
      className={`${styles.solid} ${className}`}
      enter={enter}
    >
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

function Large({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: SolidSize) {
  const att = { className, width, icon, onClick, enter };
  return (
    <SolidBtn {...att} size="l">
      {children}
    </SolidBtn>
  );
}
function Medium({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: SolidSize) {
  const att = { className, width, icon, onClick, enter };
  return (
    <SolidBtn {...att} size="m">
      {children}
    </SolidBtn>
  );
}
function Regular({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: SolidSize) {
  const att = { className, width, icon, onClick, enter };
  return (
    <SolidBtn {...att} size="r">
      {children}
    </SolidBtn>
  );
}
function Small({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: SolidSize) {
  const att = { className, width, icon, onClick, enter };
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

SolidBtn.displayName = "Btn.Solid";
Large.displayName = "Btn.Solid.Large";
Medium.displayName = "Btn.Solid.Medium";
Regular.displayName = "Btn.Solid.Regular";
Small.displayName = "Btn.Solid.Small";

export default SolidBtn;
