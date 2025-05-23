"use client";
import styles from "@/app/shared/styles/dropdown.module.css";
import DropList from "./dropList";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithClassName } from "../../types/common";
import { useAuth } from "../../provider/authProvider";
import { useRouter } from "next/navigation";
import useDocumentOut from "../../hooks/useDocumentOut";

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
  setValue?: React.Dispatch<React.SetStateAction<string>>;
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
  const [child, setChild] = useState<React.ReactNode>("");
  const [on, setOn] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useDocumentOut("div", () => {
    // 드롭다운 바깥 클릭했을 때
    setOpen(false);
    if (child !== children) {
      setOn(styles.on);
    }
  });

  useEffect(() => {
    if (child !== children) setOn(styles.on);
    setValue?.(child as string);
  }, [child, children]);

  function openHandle(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setOpen((prev) => !prev);
  }

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`.trim()}>
      <div
        className={`${styles.default} ${on} ${open ? styles.open : ""}`.trim()}
        onClick={openHandle}
      >
        <input
          type="text"
          name={name}
          value={child as string}
          placeholder={children as string}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.code === "Enter") setOpen((prev) => !prev);
          }}
          readOnly
        />
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

type login = PropsWithClassName & {};
function Login({ className }: login) {
  const { logout, user } = useAuth();
  const router = useRouter();

  if (user !== null)
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
            <h3>{user?.nickname}</h3>
            <p>{user?.grade}</p>
          </div>
        </div>
        <ul className={styles.list}>
          <li>
            <Link
              href="/pages/challenge/my/participating"
              onClick={(e) => {
                e.preventDefault();
                router.replace(e.currentTarget.href);
              }}
            >
              나의 챌린지
            </Link>
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
