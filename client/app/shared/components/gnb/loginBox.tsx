"use client";
import styles from "@/app/shared/styles/loginBox.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkImg from "../LinkImg";
import Dropdown from "../dropdown/dropdown";
import useValue from "../../hooks/useValue";
import { usePathname } from "next/navigation";
import { useAuth } from "../../provider/authProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAlramApi } from "@/app/api/user/api";
import type { User } from "../../types/user";

type LoginBoxT = {
  admin: boolean;
};
type ModalState = {
  [key: string]: boolean;
  alram: boolean;
};

const init: ModalState = {
  alram: false,
};
export default function LoginBox({ admin }: LoginBoxT) {
  const { user } = useAuth();
  const [modalState, setModalState] = useState(init);
  function openModal({ type }: { type: string }) {
    setModalState((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  const [alram, setAlram] = useState<AlramProps[]>([]);
  const { data, isFetched, isLoading } = useQuery({
    queryKey: ["alram", !!alram.length],
    queryFn: () => {
      return getAlramApi();
    },
    staleTime: 25 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isLoading) return;
    if (isFetched) setAlram(data?.alram);
  }, [isLoading, isFetched, data]);

  const path = usePathname();
  useEffect(() => {
    setModalState({
      alram: false,
      user: false,
    });
  }, [path]);
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

interface AlramProps {
  content: string;
  date: string;
  id: string;
}
function Alarm() {
  const queryClient = useQueryClient();
  const alram = queryClient.getQueryData<{ alram: AlramProps[] }>([
    "alram",
    true,
  ]);
  const isRead = useValue(false);
  function read(id: string) {
    isRead.set(true);
  }
  return (
    <div className={styles.alarm}>
      <h2>알람</h2>
      <ul>
        {!!alram?.alram.length ? (
          alram.alram.map((v, i) => {
            return (
              <li
                className={`${styles.list} ${isRead.value ? styles.read : ""}`}
                key={v.content + i}
                onClick={(e) => {
                  read(v.id);
                }}
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
