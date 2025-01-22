import styles from "@/app/shared/styles/modal.module.css";
import Popup from "./popup.jsx";
import TextBox from "./textBox.jsx";
import { PropsWithClassName } from "../../types/common.jsx";

export type ModalT = PropsWithClassName & {};

export default function Modal({ className, children }: ModalT) {
  return (
    <div className={`${styles.modal} ${className} flexCenter`}>
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
}

Modal.Popup = Popup;
Modal.TextBox = TextBox;
