"use client";
import styles from "@/app/shared/styles/list.module.css";
import Image from "next/image";
import Link from "next/link";
import { User } from "../types/user";

type ListT = {
  number: number;
  user: User;
};
function List({ number, user }: ListT) {
  return (
    <div className={`${styles.list}`}>
      <p className={`${styles.number}`}>
        <Image src="/img/icon/crown.svg" alt="number" width={20} height={20} />
        <span>{number}</span>
      </p>
      <div className={`${styles.content}`}>
        <Image
          src="/img/icon/profile_member.svg"
          alt="아이콘"
          width={30}
          height={30}
        />
        <p className={styles.user}>
          {user.name}
          <span>{user.grade}</span>
        </p>
      </div>
      <div className={styles.right}>
        <p className={`${styles.heart}`}>
          <Image src="/img/icon/heart.svg" alt="하트" width={20} height={20} />
          <span>{user.heart}</span>
        </p>
        <Link className={styles.link} href={`/user/${user.id}`}>
          작업물 보기
          <span></span>
        </Link>
      </div>
    </div>
  );
}
export default List;
