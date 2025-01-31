"use client";
import styles from "@/app/shared/styles/loginBox.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkImg from "../LinkImg";
import Dropdown from "../dropdown/dropdown";
import type { User } from "../../types/user";

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
      modal: "",
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
      modal: <Dropdown.Login className={styles.modal} user={user} />,
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
          modal: <Dropdown.Login className={styles.modal} user={user} />,
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

          if (alt === "아이콘") {
          }
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
              {alt === "아이콘" ? modalState.user && v.modal : ""}
            </div>
          );
        })
      )}
    </div>
  );
}
