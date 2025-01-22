import styles from "@/app/shared/styles/tap.module.css";
import Middle from "./middle";
import Top from "./top";
import { PropsWithChildren } from "react";

type TabT = {
  active?: boolean;
  className?: string;
};
export type TabType = PropsWithChildren<TabT>;

function Tab({ children, className }: TabType) {
  return <p className={`${styles.tab}  ${className}`}>{children}</p>;
}
Tab.Middle = Middle;
Tab.Top = Top;

export default Tab;
