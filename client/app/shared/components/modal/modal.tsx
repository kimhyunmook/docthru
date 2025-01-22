import styles from "@/app/shared/styles/modal.module.css";
import Popup from "./popup";
import TextBox from "./textBox";
import { PropsWithClassName } from "../../types/common";

export type ModalProps = PropsWithClassName & {};

export default function Modal({ className, children }: ModalProps) {
  return (
    <div className={`${styles.modal} ${className} flexCenter`}>
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
}

Modal.Popup = Popup;
Modal.TextBox = TextBox;
