"use client";
import type { Challenge, ChipType } from "@/app/shared/types/common";
import Card from "@/app/shared/components/card/card";
import useValue from "@/app/shared/hooks/useValue";
import { useEffect, useRef } from "react";
import { MyChallengeApi } from "@/app/api/challenge/api";
import s from "./styles/list.module.css";

export default function Participating({}) {
  // const data = useValue([]);
  const challenge = useValue([]);
  const page = useValue(1);
  const pageSize = useValue(10);
  const orderby = useValue("createdAt");
  const keyword = useValue("");
  const total = useValue(0);
  const scrollEl = useRef<HTMLUListElement>(null);
  const isFatching = useValue(false);
  useEffect(() => {
    MyChallengeApi({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
      type: "participating",
    }).then((res) => {
      // data.set(res.data);
      challenge.set(res.challenge);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLine = window.innerHeight + window.scrollY + 200;
      if (!!!scrollEl.current) return;
      const listHeight = scrollEl.current.getBoundingClientRect().height;
      if (challenge.value.length === total.value) return;
      if (scrollLine >= listHeight && isFatching.value) {
        page.set((prev: number) => prev + 1);
        isFatching.set(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page.value, isFatching.value]);

  return (
    <ul className={s.list} ref={scrollEl}>
      {challenge.value.length === 0 ? (
        <li className={s.noList}>챌린지가 없어요</li>
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
