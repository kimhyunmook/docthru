import styles from "@/app/shared/styles/tap.module.css";
import Tab, { TabType } from "./tab";

export default function Middle({
  className = "",
  active = false,
  children = "진행중인 챌린지",
  href,
}: TabType) {
  const att = {
    className: `${styles.middle} ${className} ${
      active ? styles.active : ""
    }`.trim(),
    href,
  };
  return <Tab {...att}>{children}</Tab>;
}

Middle.displayName = "Tab.Middle";
