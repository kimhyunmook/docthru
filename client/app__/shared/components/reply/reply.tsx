import styles from "@/app/shared/styles/reply.module.css";
import Image from "next/image";
import Textarea from "./textarea";
import { PropsWithClassName } from "../../types/common";

type ReplyT = PropsWithClassName & {
  userName: string;
  date: string;
  text: string;
};

export default function Reply({
  userName,
  date,
  text,
  children,
  className,
}: ReplyT) {
  return (
    <div className={`${styles.replyBox} ${className}`}>
      {children ? (
        children
      ) : (
        <>
          <div className={styles.top}>
            <div className={styles.left}>
              <Image
                src="/img/icon/profile_member.svg"
                alt="프로필"
                width={32}
                height={32}
              />
              <div className={styles.info}>
                <h3 className={styles.userName}>{userName}</h3>
                <p className={styles.date}>{date}</p>
              </div>
            </div>
            <div className={styles.right}>
              <button>
                <Image
                  src="/img/icon/menu_bar.svg"
                  alt="메뉴"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <p className={styles.text}>{text}</p>
        </>
      )}
    </div>
  );
}

Reply.Textarea = Textarea;
