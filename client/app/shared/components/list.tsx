"use client";
import styles from "@/app/shared/styles/list.module.css";
import Image from "next/image";
import Link from "next/link";
import { User } from "../types/user";
import { useParams } from "next/navigation";

type ListProps = {
  number: number;
  user: User;
  isLast: boolean;
  listId: number;
};
function List({ number, user, isLast, listId }: ListProps) {
  const params = useParams();
  const { id } = params;

  console.log("listId", listId);

  return (
    <div
      className={`${styles.list}`}
      style={{
        borderBottom: isLast ? "none" : "1px solid #ddd",
      }}
    >
      <p className={`${styles.number}`}>
        {number === 1 && (
          <Image
            src="/img/icon/crown.svg"
            alt="number"
            width={16}
            height={16}
          />
        )}
        <span>0{number}</span>
      </p>
      <div className={`${styles.content}`}>
        <Image
          src="/img/icon/profile_member.svg"
          alt="아이콘"
          width={30}
          height={30}
        />
        <p className={styles.user}>
          {user?.nickname}
          <span>{user?.grade}</span>
        </p>
      </div>
      <div className={styles.right}>
        <p className={`${styles.heart}`}>
          <Image src="/img/icon/heart.svg" alt="하트" width={20} height={20} />
          <span>{user?.like}</span>
        </p>
        <Link className={styles.link} href={`${id}/work/${listId}`}>
          작업물 보기
          <span></span>
        </Link>
      </div>
    </div>
  );
}
export default List;
