"use client";
import styles from "@/app/shared/styles/dropdown.module.css";
import DropList from "./dropList";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithClassName } from "../../types/common";
import { User } from "../../types/user";

const type = ["Next.js", "API", "Career", "Modern JS", "Web"];
const state = [
  "승인 대기",
  "신청 승인",
  "신청 거절",
  "신청 시간 빠른순",
  "신청 시간 느린순",
  "마감 기한 빠른순",
  "마감 기한 느린순",
];

type DropdwonProps = PropsWithClassName & {
  list?: string[];
};

function Dropdown({
  className = "",
  children = "카테고리",
  list = type,
}: DropdwonProps) {
  const [value, setValue] = useState(children);
  const [on, setOn] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (value !== children) setOn(styles.on);
  }, [value]);
  function openHandle(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setOpen(!open);
  }
  return (
    <div className={`${styles.dropdown} ${className}`.trim()}>
      <div
        className={`${styles.default} ${on} ${open ? styles.open : ""} `.trim()}
        onClick={openHandle}
      >
        {value}
      </div>
      {open && (
        <DropList
          list={list}
          setOpen={setOpen}
          open={open}
          setValue={setValue}
        />
      )}
    </div>
  );
}

function Sort({ className }: PropsWithClassName) {
  return (
    <Dropdown className={`${styles.sort} ${className}`} list={state}>
      승인 대기
    </Dropdown>
  );
}

type login = PropsWithClassName & {
  user?: User | null;
};
function Login({ className, user }: login) {
  return (
    <div className={`${styles.login} ${className}`}>
      <div className={styles.top}>
        <Image
          src="/img/icon/profile_member.svg"
          alt="프로필"
          width={32}
          height={32}
        />
        <div className={styles.text}>
          <h3>{user?.name}</h3>
          <p>{user?.grade}</p>
        </div>
      </div>
      <ul className={styles.list}>
        <li>
          <Link href="#" className="">
            나의 챌린지
          </Link>
        </li>
        <li>
          <Link href="#" className="">
            로그아웃
          </Link>
        </li>
      </ul>
    </div>
  );
}

Dropdown.Sort = Sort;
Dropdown.Login = Login;

export default Dropdown;
