"use client";
import styles from "@/app/shared/styles/card.module.css";
import Info from "../container/info";
import Image from "next/image";
import { PropsWithClassName } from "../../types/common";
import useValue from "../../hooks/useValue";
import { useEffect } from "react";
import Chip from "../chip/chip";
import type { ChipType } from "../../types/common";

type CardProps = PropsWithClassName & {
  chip?: ChipType;
  categori?: React.ReactNode;
  state?: React.ReactNode;
  date: string;
  current: number;
  total: number;
};

function Card({
  chip = null,
  categori = null,
  state = null,
  className = "",
  date = "0000년 0월 0일",
  current = 0,
  total = 0,
  children,
}: CardProps) {
  const chipElement = useValue(null);
  useEffect(() => {
    switch (chip) {
      case "nextjs":
        chipElement.set(<Chip.NextChip />);
        break;
      case "api":
        chipElement.set(<Chip.ApiChip />);
        break;
      case "career":
        chipElement.set(<Chip.CareerChip />);
        break;
      case "modern":
        chipElement.set(<Chip.ModernChip />);
        break;
      case "web":
        chipElement.set(<Chip.WebChip />);
        break;
    }
  }, []);
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        {!!state && <div className={styles.state}>{state}</div>}
        <h3 className={styles.title}>{children}</h3>
        {!!chip || !!categori ? (
          <div className={styles.chip}>
            <span>{chipElement.value}</span>
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
        <Info date={date} current={current} total={total} />
      </div>
    </div>
  );
}

export default Card;
