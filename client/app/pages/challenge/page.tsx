"use client";
import Btn from "@/app/shared/components/btn/btn";
import s from "./challenge.module.css";
import SearchInput from "@/app/shared/components/search";
import Card from "@/app/shared/components/card/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GetChallenge } from "@/app/api/challenge/api";
import type { Challenge, ChipType } from "@/app/shared/types/common";
import DropFilter from "@/app/shared/components/dropdown/filter";
import useValue from "@/app/shared/hooks/useValue";

export default function Challenge() {
  const [data, setData] = useState<Challenge[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const page = useValue(1);
  const pageSize = useValue(10);
  const orderby = useValue("createdAt");
  const keyword = useValue("");
  const total = useValue(0);
  const challenge = useRef<HTMLDivElement>(null);
  const isFatching = useValue(false);
  // const pageNation = Array.from(
  //   {
  //     length: Math.ceil(total.value / pageSize.value),
  //   },
  //   (_, i) => i + 1
  // );
  useEffect(() => {
    const handleScroll = () => {
      const scrollLine = window.innerHeight + window.scrollY + 200;
      if (!!!challenge.current) return;
      const listHeight = challenge.current.getBoundingClientRect().height;
      if (data.length === total.value) return;
      if (scrollLine >= listHeight && isFatching.value) {
        page.set((prev: number) => prev + 1);
        isFatching.set(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFatching.value, total.value]);

  useEffect(() => {
    GetChallenge({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
    }).then((res) => {
      total.set(res.total);
      isFatching.set(true);
      setData((prev) => [...prev, ...res.data]);
    });
  }, [page.value, pageSize.value, orderby.value]);

  function filterHandle() {
    setFilterOpen((prev) => !prev);
  }
  function search() {
    GetChallenge({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
    }).then((res) => {
      total.set(res.total);
      setData(() => [...res.data]);
    });
  }
  // function previous() {}
  // function next() {}
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
          />
          <SearchInput
            value={keyword.value}
            setValue={keyword.set}
            className={s.search}
            onClick={search}
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
                    field={v.field as ChipType}
                    documentType={v.documentType}
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
        {/* <div className={s.pageNavigation}>
          <button onClick={previous}>{`<`}</button>
          <ul className={s.number}>
            {pageNation.map((v, i) => {
              return (
                <li key={`${v} ${i}`}>
                  <Link href={`${v}`}>{v}</Link>
                </li>
              );
            })}
          </ul>
          <button onClick={next}>{`>`}</button>
        </div> */}
      </div>
    </div>
  );
}
