"use client";
import Tab from "@/app/shared/components/tab/tab";
import s from "./my.module.css";
import SearchInput from "@/app/shared/components/search";
import useValue from "@/app/shared/hooks/useValue";
import Card from "@/app/shared/components/card/card";
import type { Challenge, ChipType } from "@/app/shared/types/common";

export default function MyChallenge() {
  const keyword = useValue("");
  const data = useValue([]);
  function search() {}
  return (
    <div className={s.container}>
      <h2>나의 챌린지</h2>
      <div className={s.tabBox}>
        <Tab className={s.tab}>참여중인 챌린지</Tab>
        <Tab className={s.tab}>완료한 챌린지</Tab>
        <Tab className={s.tab}>신청한 챌린지</Tab>
      </div>
      <div className={s.top}>
        <SearchInput
          className={s.search}
          value={keyword.value}
          setValue={keyword.set}
          onClick={search}
        />
      </div>
      <ul className={s.list}>
        {data.value.length === 0 ? (
          <li className={s.noList}>챌린지가 없어요</li>
        ) : (
          data.value.map((v: Challenge, i:number) => {
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
    </div>
  );
}
