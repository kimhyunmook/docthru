import Reply from "./reply";
import styles from "@/app/shared/styles/reply.module.css";

type TextareaProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  className?: string;
  userName: string;
};
export default function Textarea({
  value,
  setValue,
  placeholder = "피드백을 남겨주세요",
  className,
  userName,
}: TextareaProps) {
  return (
    <Reply
      userName={userName}
      className={`${styles.replyTextarea} ${className}`}
    >
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      />
    </Reply>
  );
}

Textarea.displayName = "Reply.Textarea";
