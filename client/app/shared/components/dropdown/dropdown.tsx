"use client";
import styles from "@/app/shared/styles/dropdown.module.css";
import DropList from "./dropList";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithClassName } from "../../types/common";
import { User } from "../../types/user";
import { useAuth } from "../../provider/authProvider";

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
  name?: string;
  list?: string[];
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Dropdown({
  name = "",
  className = "",
  onChange,
  setValue,
  children = "카테고리",
  list = type,
}: DropdwonProps) {
  const [child, setChild] = useState<React.ReactNode>(children);
  const [on, setOn] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (child !== children) setOn(styles.on);
    setValue(child as string);
  }, [child, children]);

  function openHandle(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setOpen(!open);
  }
  return (
    <div className={`${styles.dropdown} ${className}`.trim()}>
      <input
        type="hidden"
        name={name}
        value={child as string}
        onChange={onChange}
      />
      <div
        className={`${styles.default} ${on} ${open ? styles.open : ""} `.trim()}
        onClick={openHandle}
      >
        {child}
      </div>
      {open && (
        <DropList
          list={list}
          setOpen={setOpen}
          open={open}
          setValue={setChild}
        />
      )}
    </div>
  );
}

function Sort({ className, setValue }: DropdwonProps) {
  return (
    <Dropdown
      setValue={setValue}
      className={`${styles.sort} ${className}`}
      list={state}
    >
      승인 대기
    </Dropdown>
  );
}

type login = PropsWithClassName & {
  user: User;
};
function Login({ className, user }: login) {
  const { logout } = useAuth();
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
          <Link href="#">나의 챌린지</Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            로그아웃
          </Link>
        </li>
      </ul>
    </div>
  );
}

Dropdown.Sort = Sort;
Dropdown.Login = Login;

Sort.displayName = "Dropdown.Sort";
Login.displayName = "Dropdown.Login";

export default Dropdown;
