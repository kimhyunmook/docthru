import Btn from "../btn/btn";
import Modal, { ModalT } from "./modal";
import styles from "@/app/shared/styles/modal.module.css";

export default function Popup({ children, className }: ModalT) {
  return (
    <Modal className={`${styles.popup} ${className}`}>
      <p>{children}</p>
      <Btn.Solid.Large className={styles.btn} width={120}>
        확인
      </Btn.Solid.Large>
    </Modal>
  );
}
