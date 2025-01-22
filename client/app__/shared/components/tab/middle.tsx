import styles from "@/app/shared/styles/tap.module.css";
import Tab, { TabType } from "./tab.jsx";

export default function Middle({
  className = "",
  active = false,
  children = "진행중인 챌린지",
}: TabType) {
  const att = {
    className: `${styles.middle} ${className} ${
      active ? styles.active : ""
    }`.trim(),
  };
  return <Tab {...att}>{children}</Tab>;
}
