"use client";
import styles from "@/app/shared/styles/loginBox.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkImg from "../LinkImg";

type LoginBoxT = {
  login: boolean;
  admin: boolean;
};

export default function LoginBox({ login = false, admin }: LoginBoxT) {
  function openModal() {}
  
  const [state, setState] = useState([
    {
      href: "#",
      src: "/img/icon/alarm.svg",
      alt: "알람",
      width: 18,
      height: 18,
      onClick: () => {},
    },
    {
      href: "#",
      src: "/img/icon/profile_member.svg",
      alt: "유저",
      width: 32,
      height: 32,
      onClick: () => {},
    },
  ]);

  useEffect(() => {
    if (admin)
      setState([
        {
          href: "#",
          src: "/img/icon/profile_admin.svg",
          alt: "어드민",
          width: 32,
          height: 32,
          onClick: () => {},
        },
      ]);
  }, [admin]);

  return (
    <div className={styles.loginBox}>
      {!login ? (
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
            <LinkImg
              key={src + i}
              href={href}
              src={src}
              alt={alt}
              width={width}
              height={height}
              onClick={onClick}
            />
          );
        })
      )}
    </div>
  );
}
