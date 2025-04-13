import Btn from "../btn/btn";
import Modal, { ModalProps } from "./modal";
import styles from "@/app/shared/styles/modal.module.css";

export default function Popup({ children, className, btnFree }: ModalProps) {
  return (
    <Modal className={`${styles.popup} ${className}`}>
      <p>{children}</p>
      <div className={styles.btnArea}></div>
      {btnFree ? (
        btnFree
      ) : (
        <Btn.Solid.Large className={styles.btn} width={120}>
          확인
        </Btn.Solid.Large>
      )}
    </Modal>
  );
}
Popup.displayName = "Modal.Popup";
