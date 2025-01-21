import Btn from "../btn/btn";
import Modal, { ModalT } from "./modal";
import styles from "@/app/shared/styles/modal.module.css";

type TextBoxT = ModalT & {
  title: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: (v: string) => void;
};

export default function TextBox({
  className,
  children,
  title,
  name,
  placeholder,
  value,
  setValue,
}: TextBoxT) {
  return (
    <Modal className={`${styles.textbox} ${className}`}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.close}></div>
      </div>
      <div className={styles.textarea}>
        <label htmlFor={name} className={styles.label}>
          내용
        </label>
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
        >
          {value}
        </textarea>
      </div>
      <Btn.Solid.Large className={styles.btn}>전송</Btn.Solid.Large>
      {children}
    </Modal>
  );
}

function Reject({ className, name, value, setValue }: TextBoxT) {
  return (
    <TextBox
      name={name}
      className={className}
      value={value}
      setValue={setValue}
      title={"거절 사유"}
      placeholder={"거절사유를 입력해주세요"}
    ></TextBox>
  );
}
TextBox.Reject = Reject;
