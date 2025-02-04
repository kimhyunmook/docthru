import styles from "@/app/shared/styles/tap.module.css";
import Middle from "./middle";
import Top from "./top";
import { PropsWithChildren } from "react";
import Link from "next/link";

type TabProps = {
  active?: boolean;
  className?: string;
  href: string;
};
export type TabType = PropsWithChildren<TabProps>;

function Tab({ children, className, href }: TabType) {
  return (
    <Link href={href} className={`${styles.tab}  ${className}`}>
      {children}
    </Link>
  );
}
Tab.Middle = Middle;
Tab.Top = Top;

export default Tab;
