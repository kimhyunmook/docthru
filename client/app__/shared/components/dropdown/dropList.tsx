"use client";
import styles from "@/app/shared/styles/dropdown.module.css";
import { PropsWithClassName } from "../../types/common";
type DropListProps = PropsWithClassName & {
  list: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};
export default function DropList({
  list = [],
  className,
  setValue,
  open,
  setOpen,
}: DropListProps) {
  function clickHnadle(e: React.MouseEvent<HTMLLIElement>) {
    const { textContent } = e.target as HTMLElement;
    setValue(textContent || "");
    setOpen(!open);
  }
  return (
    <ul className={`${styles.dropList} ${className}`}>
      {list.map((v, i) => {
        return (
          <li key={`${v}_${i}`} onClick={clickHnadle}>
            <p>{v}</p>
          </li>
        );
      })}
    </ul>
  );
}
