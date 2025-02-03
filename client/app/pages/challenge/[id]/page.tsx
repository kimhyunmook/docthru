"use client";

import Chip from "@/app/shared/components/chip/chip";
import Image from "next/image";
import s from "./detail.module.css";
import Container from "@/app/shared/components/container/container";
import { useEffect, useState } from "react";
import { DetailCallenge } from "@/app/api/challenge/api";

export default function Detail() {
  DetailCallenge({"779bf023-6bf0-4011-bf4d-49f50bc55ca6"}).then;

  return (
    <div className={s.total}>
      <div className={s.inner}>
        <div className={s.content_box}>
          <div className={s.title_box}>
            <h2>제목</h2>
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
            <p>
              Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다!
              라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해
              공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)
            </p>
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
