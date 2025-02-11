"use client";
import Btn from "@/app/shared/components/btn/btn";
import s from "./challenge.module.css";
import SearchInput from "@/app/shared/components/search";
import Card from "@/app/shared/components/card/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GetChallenge } from "@/app/api/challenge/api";
import type {
  Challenge,
  ChallengeFilterProps,
  FieldType,
} from "@/app/shared/types/common";
import DropFilter from "@/app/shared/components/dropdown/filter";
import useValue from "@/app/shared/hooks/useValue";

export default function Challenge() {
  const [data, setData] = useState<Challenge[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const page = useValue<number>(1);
  const pageSize = useValue(10);
  const orderby = useValue("createdAt");
  const keyword = useValue("");
  const filter = useValue<ChallengeFilterProps>({
    field: [],
    documentType: [],
    state: [],
  });
  const total = useValue(0);
  const challenge = useRef<HTMLDivElement>(null);
  const isFatching = useValue(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLine = window.innerHeight + window.scrollY + 200;
      if (!!!challenge.current) return;
      const listHeight = challenge.current.getBoundingClientRect().height;
      if (data.length === total.value) return;
      if (scrollLine >= listHeight && isFatching.value) {
        page.set((prev) => prev + 1);
        isFatching.set(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFatching.value, total.value]);

  useEffect(() => {
    GetChallenge({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
      filter: filter.value,
    }).then((res) => {
      total.set(res.total);
      isFatching.set(true);
      setData((prev) => [...prev, ...res.data]);
      console.log(res.data);
    });
  }, [page.value, pageSize.value, orderby.value]);

  useEffect(() => {
    getData();
  }, [filter.value]);

  function filterHandle() {
    setFilterOpen((prev) => !prev);
  }

  function getData() {
    GetChallenge({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
      filter: filter.value,
    }).then((res) => {
      total.set(res.total);
      setData(() => [...res.data]);
    });
  }

  return (
    <div ref={challenge} className={s.challenge} style={{}}>
      <div className={s.top}>
        <h2>챌린지 목록</h2>
        <Link href={`/pages/challenge/create`}>
          <Btn.Solid className={s.createBtn} size="l">
            신규 챌린지 신청 +
          </Btn.Solid>
        </Link>
      </div>
      <div className={s.content}>
        <div className={s.search_box}>
          <DropFilter
            open={filterOpen}
            setOpen={setFilterOpen}
            onClick={filterHandle}
            setFilter={filter.set}
          />
          <SearchInput
            value={keyword.value}
            setValue={keyword.set}
            className={s.search}
            onClick={getData}
          ></SearchInput>
        </div>
        <ul className={s.list}>
          {data.length === 0 ? (
            <li className={s.noList}>챌린지가 없어요</li>
          ) : (
            data.map((v: Challenge, i) => {
              return (
                <li key={i}>
                  <Card
                    href={`/pages/challenge/${v.id}`}
                    field={v.field as FieldType}
                    documentType={v.documentType}
                    className={``}
                    state={v.state}
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
