"use client";
import styles from "@/app/shared/styles/container.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PropsWithClassName } from "../../types/common";

export type InfoProps = {
  date: Date | string;
  current: number;
  total: number;
} & PropsWithClassName;

export default function Info({
  date,
  current,
  total,
  className = "",
}: InfoProps) {
  const [finish, setFinish] = useState(false);
  function pretyDate() {
    const dateData = new Date(date);
    const year = dateData.getFullYear();
    const month = dateData.getMonth() + 1;
    const day = dateData.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }
  useEffect(() => {
    if (current === total) setFinish(true);
    else setFinish(false);
  }, [current, total]);
  return (
    <>
      <div className={`${styles.date} ${className}`}>
        <Image src="/img/icon/clock.svg" alt="시계" width={16} height={15.5} />
        <p> {pretyDate()} 마감</p>
      </div>
      <div className={`${styles.person} ${className}`}>
        <Image src="/img/icon/person2.svg" alt="사람" width={24} height={24} />
        <p>
          {current}/{total} {finish ? "참여 완료" : ""}
        </p>
      </div>
    </>
  );
}
