"use client";
import Btn from "@/app/shared/components/btn/btn";
import s from "./challenge.module.css";
import Dropdown from "@/app/shared/components/dropdown/dropdown";
import SearchInput from "@/app/shared/components/search";
import Card from "@/app/shared/components/card/card";
import Chip from "@/app/shared/components/chip/chip";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetChallenge } from "@/app/api/challenge/api";
import useValue from "@/app/shared/hooks/useValue";
import type { ChallengeProps, ChipType } from "@/app/shared/types/common";

export default function Challenge() {
  const [data, setData] = useState([]);
  const filter = useValue("");
  useEffect(() => {
    GetChallenge({}).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className={s.challenge}>
      <div className={s.top}>
        <h2>챌린지 목록</h2>
        <Link href={`/pages/challenge/create`}>
          <Btn.Solid size="l">신규 챌린지 신청 +</Btn.Solid>
        </Link>
      </div>
      <div>
        <div className={s.search_box}>
          <Dropdown.Sort setValue={filter.set} className={s.filter}>
            필터
          </Dropdown.Sort>
          <SearchInput className={s.search}></SearchInput>
        </div>
        <ul className={""}>
          {data.length === 0 ? (
            <li className={s.noList}>
              아직 챌린지가 없어요, <br /> 지금 바로 챌린지를 신청해보세요
            </li>
          ) : (
            data.map((v: ChallengeProps, i) => {
              console.log(v);
              return (
                <li key={i}>
                  <Card
                    field={v.field as ChipType}
                    documentType={"블로그"}
                    state={<Chip.Card.Compolete />}
                    className={``}
                    date="0000년 00월 00일"
                    current={v.current}
                    total={v.maximum}
                  ></Card>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
