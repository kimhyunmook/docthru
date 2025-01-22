"use client";
import React, { useEffect, useState } from "react";
import { PropsWithClassName } from "../types/common";
import styles from "./styles/useLayout.module.css";

type UseLayoutProps = PropsWithClassName & {
  title: string;
  width?: number | string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<object>>;
};

export default function UseLayout({
  children,
  title,
  width,
  setOpen,
  setValue,
}: UseLayoutProps) {
  return (
    <div className={styles.use} style={{ width }}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {React.Children.map(children, (child, index) => {
          return (
            <li
              className={styles.li}
              key={index}
              onClick={(e) => {
                console.log(child);
                setOpen(true);
                if (!React.isValidElement(child)) return;
                setValue({
                  name: typeof child.type === "function" ? child.type.name : "",
                  props: child.props,
                });
              }}
            >
              {child}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
