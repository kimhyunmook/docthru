"use client";
import type { Challenge, ChipType } from "@/app/shared/types/common";
import Card from "@/app/shared/components/card/card";
import useValue from "@/app/shared/hooks/useValue";
import { useEffect } from "react";
import { MyChallengeApi } from "@/app/api/challenge/api";
import s from "./styles/list.module.css";

export default function Finish({}) {
  const data = useValue([]);
  const challenge = useValue([]);
  useEffect(() => {
    MyChallengeApi("finish").then((res) => {
      data.set(res.data);
      challenge.set(res.challenge);
    });
  }, []);
  return (
    <ul className={s.list}>
      {challenge.value.length === 0 ? (
        <li className={s.noList}>해당하는 챌린지가 없어요</li>
      ) : (
        challenge.value.map((v: Challenge, i: number) => {
          return (
            <li key={i}>
              <Card
                href={`${v.id}`}
                field={v.field as ChipType}
                documentType={v.documentType}
                className={``}
                date={v.date}
                current={v.current}
                maximum={v.maximum}
                continueBtn={true}
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
