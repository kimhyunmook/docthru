import Image from "next/image";
import Btn, { BtnProps } from "./btn";
import styles from "@/app/shared/styles/btn.module.css";
type OutlineProps = BtnProps & {
  icon?: string;
};
type OutlineSize = Omit<OutlineProps, "size">;

function OutlineBtn({
  size,
  className,
  children,
  width,
  icon,
  onClick,
  enter,
}: OutlineProps) {
  return (
    <Btn
      size={size}
      width={width}
      onClick={onClick}
      className={`${styles.outline} ${className}`}
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
}: OutlineSize) {
  const att = {
    className,
    width,
    icon,
    onClick,
    enter,
  };
  return (
    <OutlineBtn {...att} size="l">
      {children}
    </OutlineBtn>
  );
}
function Medium({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: OutlineSize) {
  const att = {
    className,
    width,
    icon,
    onClick,
    enter,
  };
  return (
    <OutlineBtn {...att} size="m">
      {children}
    </OutlineBtn>
  );
}
function Regular({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: OutlineSize) {
  const att = {
    className,
    width,
    icon,
    onClick,
    enter,
  };
  return (
    <OutlineBtn {...att} size="r">
      {children}
    </OutlineBtn>
  );
}
function Small({
  children,
  className,
  width,
  icon,
  onClick,
  enter,
}: OutlineSize) {
  const att = {
    className,
    width,
    icon,
    onClick,
    enter,
  };
  return (
    <OutlineBtn {...att} size="s">
      {children}
    </OutlineBtn>
  );
}

OutlineBtn.Large = Large;
OutlineBtn.Medium = Medium;
OutlineBtn.Regular = Regular;
OutlineBtn.Small = Small;

OutlineBtn.displayName = "Btn.Outline";
Large.displayName = "Btn.Outline.Large";
Medium.displayName = "Btn.Outline.Medium";
Regular.displayName = "Btn.Outline.Regular";
Small.displayName = "Btn.Outline.Small";

export default OutlineBtn;
