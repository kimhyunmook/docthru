import styles from "@/app/shared/styles/chip.module.css";
import Chip from "./chip.jsx";
import Image from "next/image";

function Card({
  bg,
  color,
  children,
  icon = {
    src: "",
    alt: "",
    width: 0,
    height: 0,
  },
  className,
}) {
  const att = {
    bg,
    color,
    className: `${styles.card} ${className}`,
  };
  return (
    <Chip {...att}>
      <Image {...icon} />
      {children}
    </Chip>
  );
}
const size = {
  width: 20,
  height: 20,
};
function Compolete({ className }) {
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

function Finish({ className }) {
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
