"use client";
import styles from "@/app/shared/styles/tap.module.css";
import Tab, { TabType } from "./tab.jsx";

export default function Top({
  className = "",
  active = false,
  children = "탭01",
}: TabType) {
  const att = {
    className: `${styles.top} ${className} ${
      active ? styles.active : ""
    }`.trim(),
  };
  return <Tab {...att}>{children}</Tab>;
}
