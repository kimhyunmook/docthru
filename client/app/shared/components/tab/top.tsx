"use client";
import styles from "@/app/shared/styles/tap.module.css";
import Tab, { TabType } from "./tab";

export default function Top({
  className = "",
  active = false,
  children = "탭01",
  href,
}: TabType) {
  const att = {
    className: `${styles.top} ${className} ${
      active ? styles.active : ""
    }`.trim(),
    href,
  };
  return <Tab {...att}>{children}</Tab>;
}

Top.displayName = "Tab.Top";
