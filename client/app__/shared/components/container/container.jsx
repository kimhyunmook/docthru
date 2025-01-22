"use client";
import styles from "@/app/shared/styles/container.module.css";
import Btn from "../btn/btn";
import Info from "./info";

function Container({ date = "0000년 0월 0일", current = 0, max = 0 }) {
  return (
    <div className={`${styles.container} flexCenter`}>
      <div className={styles.top}>
        <Info date={date} current={current} max={max} />
      </div>
      <div className={styles.btnArea}>
        <Btn.Filled.Yellow>원문 보기</Btn.Filled.Yellow>
        <Btn.Solid.Regular>작업 도전하기</Btn.Solid.Regular>
      </div>
    </div>
  );
}

export default Container;
