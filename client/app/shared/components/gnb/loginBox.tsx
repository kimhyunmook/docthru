"use client";
import styles from "@/app/shared/styles/loginBox.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkImg from "../LinkImg";
import Dropdown from "../dropdown/dropdown";
import type { User } from "../../types/user";
import useValue from "../../hooks/useValue";

type LoginBoxT = {
  user: User;
  admin: boolean;
};
type ModalState = {
  [key: string]: boolean;
  alram: boolean;
  user: boolean;
};

const init: ModalState = {
  alram: false,
  user: false,
};
export default function LoginBox({ user, admin }: LoginBoxT) {
  const [modalState, setModalState] = useState(init);
  function openModal({ type }: { type: string }) {
    setModalState((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  const [state, setState] = useState([
    {
      href: "#",
      src: "/img/icon/alarm.svg",
      alt: "알람",
      width: 18,
      height: 18,
      modal: <Alarm />,
      onClick: () => {
        openModal({ type: "alram" });
      },
    },
    {
      href: "#",
      src: "/img/icon/profile_member.svg",
      alt: "아이콘",
      width: 32,
      height: 32,
      modal: <Dropdown.Login className={styles.modal} />,
      onClick: () => {
        openModal({ type: "user" });
      },
    },
  ]);

  useEffect(() => {
    if (user?.grade === "어드민")
      setState([
        {
          href: "#",
          src: "/img/icon/profile_admin.svg",
          alt: "아이콘",
          width: 32,
          height: 32,
          modal: <Dropdown.Login className={styles.modal} />,
          onClick: () => {
            openModal({ type: "user" });
          },
        },
      ]);
  }, [admin, modalState]);

  return (
    <div className={styles.loginBox}>
      {!!!user ? (
        <Link
          className={`${styles.loginBtn} flexCenter`}
          href="/pages/auth/login"
        >
          로그인
        </Link>
      ) : (
        state.map((v, i: number) => {
          const { src, alt, width, height, href, onClick } = v;

          return (
            <div key={src + i} className={styles.itemBox}>
              <LinkImg
                href={href}
                src={src}
                alt={alt}
                width={width}
                height={height}
                onClick={onClick}
              />
              {alt === "아이콘"
                ? modalState.user && v.modal
                : modalState.alram && v.modal}
            </div>
          );
        })
      )}
    </div>
  );
}

interface AlarmProps {
  content: string;
  date: string;
}
function Alarm() {
  const isRead = useValue(false);
  const data: AlarmProps[] = [
    {
      content: "testing alarm",
      date: "1234.11.11",
    },
    {
      content: "1234",
      date: "1234.11.11",
    },
  ];
  function read() {
    isRead.set(true);
  }
  return (
    <div className={styles.alarm}>
      <h2>알람</h2>
      <ul>
        {!!data.length ? (
          data.map((v, i) => {
            return (
              <li
                className={`${styles.list} ${isRead.value ? styles.read : ""}`}
                key={v.content + i}
                onClick={read}
              >
                <p className={styles.content}>{v.content}</p>
                <p className={styles.date}>{v.date}</p>
              </li>
            );
          })
        ) : (
          <li className={styles.noList}>
            <p>알람이 없어요</p>
          </li>
        )}
      </ul>
    </div>
  );
}
