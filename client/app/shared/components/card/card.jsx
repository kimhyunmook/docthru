import styles from "@/app/shared/styles/card.module.css";
import Info from "../container/info";
import Image from "next/image";

function Card({
  chip = null,
  categori = null,
  state = null,
  className = "",
  date = "0000년 0월 0일",
  current = 0,
  max = 0,
  children,
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        {!!state && <div className={styles.state}>{state}</div>}
        <h3 className={styles.title}>{children}</h3>
        {!!chip || !!categori ? (
          <div className={styles.chip}>
            <span>{chip}</span>
            <span>{categori}</span>
          </div>
        ) : null}
        <div className={styles.menu}>
          <Image
            src="/img/icon/menu_bar.svg"
            alt="메뉴"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className={styles.info}>
        <Info date={date} current={current} max={max} />
      </div>
    </div>
  );
}

export default Card;
