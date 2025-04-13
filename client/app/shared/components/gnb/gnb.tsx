"use client";
import styles from "@/app/shared/styles/header.module.css";
import LoginBox from "./loginBox";
import LinkImg from "../LinkImg";
import Link from "next/link";
import { User } from "../../types/user";
import { io } from "socket.io-client";
import { useEffect } from "react";

// 백엔드 서버 주소 (포트 8000)

const socket = io("http://localhost:8000", { transports: ["websocket"] });
interface Gnb {
  user: User;
}
export default function Gnb({ user }: Gnb) {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ 웹소켓 연결 성공:", socket.id);
    });

    // 서버에서 오는 메시지 수신
    socket.on("message", (data) => {
      // setMessages((prev) => [...prev, data]);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <header id={"header"} className={`${styles.header} flexCenter`}>
      <nav className={`${styles.gnb}`}>
        <div className={`${styles.left}`}>
          <LinkImg
            className={styles.logo}
            href="/pages"
            src="/img/logo.svg"
            alt="docthru"
            width={108}
            height={31}
          />
          {user?.grade === "어드민" ? (
            <ul className={`${styles.gnbMenu} flexCenter`}>
              <li>
                <Link href="#">챌린지 관리</Link>
              </li>
              <li>
                <Link href="#">챌린지 목록</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <LoginBox admin={user?.grade === "어드민"} />
      </nav>
    </header>
  );
}
