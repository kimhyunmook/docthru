"use client";
import styles from "@/app/shared/styles/card.module.css";
import Info from "../container/info";
import Image from "next/image";
import { PropsWithClassName } from "../../types/common";
import useValue from "../../hooks/useValue";
import { useEffect } from "react";
import Chip from "../chip/chip";
import type { FieldType, DocumentType, StateType } from "../../types/common";
import Link from "next/link";
import Btn from "../btn/btn";

type CardProps = PropsWithClassName & {
  field?: FieldType;
  documentType?: DocumentType;
  date: Date | string;
  href: string;
  state: StateType;
  current: number;
  maximum: number;
  continueBtn?: boolean;
};

function Card({
  href = "#",
  field = null,
  documentType,
  className = "",
  date,
  state,
  current = 0,
  maximum = 0,
  continueBtn = false,
  children,
}: CardProps) {
  const chipElement = useValue<React.ReactNode>(null);
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
      case "modern js":
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

  // const finish = useValue(false);
  // useEffect(() => {
  //   const now = new Date();
  //   const finishDate = new Date(date);
  //   if (finishDate <= now) finish.set(true);
  //   else finish.set(false);
  // }, [date]);
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        {complte.value ? (
          <ul className={styles.state}>
            <li>
              <Chip.Card.Compolete />
            </li>
            {state === "finish" && (
              <li>
                <Chip.Card.Finish />
              </li>
            )}
          </ul>
        ) : (
          state === "finish" && (
            <ul className={styles.state}>
              <li>
                <Chip.Card.Finish />
              </li>
            </ul>
          )
        )}
        <Link href={href} className={styles.title}>
          {children}
        </Link>
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
      <div className={styles.bottom}>
        <div className={styles.info}>
          <Info date={date} current={current} total={maximum} />
        </div>
        {continueBtn && (
          <Link href={href} className={styles.countinueBtn}>
            <Btn.Outline.Small icon="/img/icon/arrow_right.svg">
              도전 계속하기
            </Btn.Outline.Small>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
