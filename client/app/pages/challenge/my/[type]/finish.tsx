"use client";
import type { Challenge, FieldType } from "@/app/shared/types/common";
import Card from "@/app/shared/components/card/card";
import useValue from "@/app/shared/hooks/useValue";
import { useEffect, useRef } from "react";
import { MyChallengeApi } from "@/app/service/challenge/api";
import s from "./styles/list.module.css";

export default function Finish({}) {
  const data = useValue([]);
  const challenge = useValue([]);
  const page = useValue(1);
  const pageSize = useValue(5);
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
      type: "finish",
    }).then((res) => {
      data.set(res.data);
      challenge.set(res.challenge);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLine = window.innerHeight + window.scrollY - 150;
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
        <li className={s.noList}>해당하는 챌린지가 없어요</li>
      ) : (
        challenge.value.map((v: Challenge, i: number) => {
          return (
            <li key={i}>
              <Card
                cardId={v.id}
                href={`${v.id}`}
                field={v.field as FieldType}
                documentType={v.documentType}
                className={``}
                date={v.date}
                state={v.state}
                current={v.current}
                maximum={v.maximum}
                onerId={v.onerId}
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
