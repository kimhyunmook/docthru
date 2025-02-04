"use client";
import styles from "@/app/shared/styles/card.module.css";
import Info from "../container/info";
import Image from "next/image";
import { PropsWithClassName } from "../../types/common";
import useValue from "../../hooks/useValue";
import { useEffect } from "react";
import Chip from "../chip/chip";
import type { ChipType, DocumentType } from "../../types/common";
import Link from "next/link";

type CardProps = PropsWithClassName & {
  field?: ChipType;
  documentType?: DocumentType;
  date: string;
  href: string;
  current: number;
  maximum: number;
};

function Card({
  href = "#",
  field = null,
  documentType = null,
  className = "",
  date,
  current = 0,
  maximum = 0,
  children,
}: CardProps) {
  const chipElement = useValue(null);
  useEffect(() => {
    switch (field?.toLocaleLowerCase()) {
      case "next.js":
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
  }, [field]);

  const complte = useValue(false);
  useEffect(() => {
    if (current === maximum) complte.set(true);
    else complte.set(false);
  }, [current, maximum]);

  const finish = useValue(false);
  useEffect(() => {
    const now = new Date();
    const finishDate = new Date(date);
    if (finishDate <= now) finish.set(true);
    else finish.set(false);
  }, [date]);

  return (
    <Link
      href={"/pages/challenge/" + href}
      className={`${styles.card} ${className}`}
    >
      <div className={styles.top}>
        {complte.value ||
          (finish.value && (
            <ul className={styles.state}>
              {complte.value && (
                <li>
                  <Chip.Card.Compolete />
                </li>
              )}
              {finish.value && (
                <li>
                  <Chip.Card.Finish />
                </li>
              )}
            </ul>
          ))}
        <h3 className={styles.title}>{children}</h3>
        {!!field || !!documentType ? (
          <div className={styles.chip}>
            <span>{chipElement.value}</span>
            <span>
              <Chip.Categori>{documentType}</Chip.Categori>
            </span>
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
        <Info date={date} current={current} total={maximum} />
      </div>
    </Link>
  );
}

export default Card;
