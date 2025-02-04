"use client";
import s from "./participating.module.css";
import type { Challenge, ChipType } from "@/app/shared/types/common";
import Card from "@/app/shared/components/card/card";
import useValue from "@/app/shared/hooks/useValue";
import { useEffect } from "react";
import { MyChallengeApi } from "@/app/api/challenge/api";

export default function Participating() {
  const data = useValue([]);
  useEffect(() => {
    MyChallengeApi("participating");
  }, []);
  return (
    <ul className={s.list}>
      {data.value.length === 0 ? (
        <li className={s.noList}>챌린지가 없어요</li>
      ) : (
        data.value.map((v: Challenge, i: number) => {
          return (
            <li key={i}>
              <Card
                href={`${v.id}`}
                field={v.field as ChipType}
                documentType={"블로그"}
                className={``}
                date={v.date}
                current={v.current}
                maximum={v.maximum}
              >
                {v.title}
              </Card>
            </li>
          );
        })
      )}
    </ul>
  );
}
