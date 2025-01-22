import Reply from "./reply";
import styles from "@/app/shared/styles/reply.module.css";

export default function Textarea({
  value,
  setValue,
  placeholder = "피드백을 남겨주세요",
  className,
}) {
  return (
    <Reply className={`${styles.replyTextarea} ${className}`}>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      >
        {value}
      </textarea>
    </Reply>
  );
}
