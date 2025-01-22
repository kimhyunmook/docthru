import React from "react";
import { PropsWithClassName } from "../types/common";
import styles from "./styles/useLayout.module.css";

type UseLayoutProps = PropsWithClassName & {
  title: string;
  width?: number | string;
};

export default function UseLayout({ children, title, width }: UseLayoutProps) {
  return (
    <div className={styles.use} style={{ width }}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {React.Children.map(children, (child, index) => {
          return (
            <li className={styles.li} key={index}>
              {child}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
