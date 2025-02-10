"use client";

import s from "./workpage.module.css";
import Image from "next/image";
import Chip from "@/app/shared/components/chip/chip";
import { useParams } from "next/navigation";

export default function WorkPage({ params }: { params: { id: string } }) {
  return (
    <div className={s.gridContainer}>
      {/* 제목과 카테고리 */}
      <div className={s.header}>
        <h2 className={s.title}>
          개발자로써 자신만의 브랜드를 구축하는 방법 (dailydev)
        </h2>
        <div className={s.chips}>
          <Chip.CareerChip />
          <Chip.Categori>블로그</Chip.Categori>
        </div>
      </div>

      {/* 유저 정보 */}
      <div className={s.userInfo}>
        <div className={s.userDetails}>
          <Image
            src="/img/icon/profile_member.svg"
            alt="아이콘"
            width={30}
            height={30}
          />
          <p className={s.user}>럽윈즈올</p>
        </div>
        <div className={s.likes}>
          <Image
            src="/img/icon/line_heart.svg"
            alt="아이콘"
            width={16}
            height={16}
          />
          <span>1,934</span>
        </div>
        <span className={s.date}>24/02/28</span>
      </div>
    </div>
  );
}
