"use client";

import Chip from "@/app/shared/components/chip/chip";
import Image from "next/image";
import s from "./detail.module.css";
import Container from "@/app/shared/components/container/container";
import { useEffect, useState } from "react";
import { DetailCallenge } from "@/app/api/challenge/api";
import { useParams } from "next/navigation";
import { PropsWithClassName } from "@/app/shared/types/common";

export default function Detail() {
  const params = useParams();
  const { id } = params;

  const [data, setData] = useState({ title: "", field: "", content: "" });
  const [abc, setAbc] = useState<any>({ value: "", bg: "", label: "" });

  useEffect(() => {
    DetailCallenge({ id: `${id}` }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className={s.total}>
      <div className={s.inner}>
        <div className={s.content_box}>
          <div className={s.title_box}>
            <h2>{data?.title}</h2>
            <Image
              src="/img/icon/menu_bar.svg"
              alt="메뉴"
              width={24}
              height={24}
            />
          </div>
          <div className={s.chip_box}>
            <Chip.NextChip />
            <Chip.Categori>공식문서</Chip.Categori>
          </div>
          <div className={s.text_box}>
            <p>{data.content}</p>
            <div className={`${s.content}`}>
              <Image
                src="/img/icon/profile_member.svg"
                alt="아이콘"
                width={30}
                height={30}
              />
              <p className={s.user}>
                {/* {user.name} */}
                유저네임
              </p>
            </div>
          </div>
        </div>
        <Container />
      </div>
      <div className={s.bottom}>
        <span></span>
        <div className={s.list_box}></div>
      </div>
    </div>
  );
}

type ChipProps = PropsWithClassName & {
  bg?: string;
  color?: string;
};

function Abc({ bg, color, children, className }: ChipProps) {
  return (
    <p
      className={`${s.chip} ${className}`}
      style={{
        backgroundColor: bg,
        color,
      }}
    >
      {children}
    </p>
  );
}
