"use client";
import Btn from "@/app/shared/components/btn/btn";
import s from "./challenge.module.css";
import Dropdown from "@/app/shared/components/dropdown/dropdown";
import SearchInput from "@/app/shared/components/search";
import Card from "@/app/shared/components/card/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetChallenge } from "@/app/api/challenge/api";
import useValue from "@/app/shared/hooks/useValue";
import type { Challenge, ChipType } from "@/app/shared/types/common";
import DropFilter from "@/app/shared/components/dropdown/filter";

export default function Challenge() {
  const [data, setData] = useState([]);
  const filter = useValue("");
  const [filterOpen, setFilterOpen] = useState(false);
  useEffect(() => {
    GetChallenge({}).then((res) => {
      setData(res.data);
    });
  }, []);

  function filterHandle() {
    setFilterOpen((prev) => !prev);
  }
  return (
    <div className={s.challenge}>
      <div className={s.top}>
        <h2>챌린지 목록</h2>
        <Link href={`/pages/challenge/create`}>
          <Btn.Solid className={s.createBtn} size="l">
            신규 챌린지 신청 +
          </Btn.Solid>
        </Link>
      </div>
      <div>
        <div className={s.search_box}>
          <DropFilter
            open={filterOpen}
            setOpen={setFilterOpen}
            onClick={filterHandle}
          />
          <SearchInput className={s.search}></SearchInput>
        </div>
        <ul className={s.list}>
          {data.length === 0 ? (
            <li className={s.noList}>
              아직 챌린지가 없어요, <br /> 지금 바로 챌린지를 신청해보세요
            </li>
          ) : (
            data.map((v: Challenge, i) => {
              console.log(v);
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
    </div>
  );
}
