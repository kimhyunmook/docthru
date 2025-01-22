import styles from "@/app/shared/styles/chip.module.css";
import Chip, { ChipProps } from "./chip";
import Image, { ImageProps } from "next/image";

type CardProps = ChipProps & {
  icon: ImageProps;
};
type CardChildProps = Omit<CardProps, "icon">;

function Card({ bg, color, children, icon, className }: CardProps) {
  const att = {
    bg,
    color,
    className: `${styles.card} ${className}`,
  };
  return (
    <Chip {...att}>
      <Image {...icon} alt={icon.alt || ""} />
      {children}
    </Chip>
  );
}
const size = {
  width: 20,
  height: 20,
};
function Compolete({ className }: CardChildProps) {
  const icon = {
    src: "/img/icon/person.svg",
    alt: "완료",
    ...size,
  };
  return (
    <Card icon={icon} className={`${styles.compolete} ${className}`}>
      모집이 완료된 상태에요
    </Card>
  );
}

function Finish({ className }: CardChildProps) {
  const icon = {
    src: "/img/icon/deadline.svg",
    alt: "완료",
    ...size,
  };
  return (
    <Card icon={icon} className={`${styles.Finish} ${className}`}>
      챌린지가 마갑되었습니다.
    </Card>
  );
}

Card.Compolete = Compolete;
Card.Finish = Finish;

export default Card;
