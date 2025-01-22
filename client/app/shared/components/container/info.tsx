"use client";
import styles from "@/app/shared/styles/container.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export type InfoProps = {
  date: string;
  current: number;
  total: number;
};

export default function Info({ date, current, total }: InfoProps) {
  const [finish, setFinish] = useState(false);
  useEffect(() => {
    if (current === total) setFinish(true);
  }, [current, total]);
  return (
    <>
      <div className={styles.date}>
        <Image src="/img/icon/clock.svg" alt="시계" width={16} height={15.5} />
        <p> {date} 마감</p>
      </div>
      <div className={styles.person}>
        <Image src="/img/icon/person2.svg" alt="사람" width={24} height={24} />
        <p>
          {current}/{total} {finish ? "참여 완료" : ""}
        </p>
      </div>
    </>
  );
}
