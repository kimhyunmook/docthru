"use client";
import useValue from "@/app/shared/hooks/useValue";
import s from "./styles/apply.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { MyApplyApi } from "@/app/api/challenge/api";
import { Challenge } from "@/app/shared/types/common";
import textDate from "@/app/shared/hooks/textDate";

export default function Apply({}) {
  const data = useValue([]);
  const total = useValue(0);
  const page = useValue(1);
  const pageSize = useValue(10);
  const orderby = useValue("createdAt");
  const keyword = useValue("");
  const pageNation = useValue<number[]>([]);
  const pageStartNum = useValue<number>(1);
  const pageLastNum = useValue<number>(pageSize.value);

  useEffect(() => {
    for (let i: number = pageStartNum.value; i <= pageLastNum.value; i++) {
      pageNation.value.push(i);
    }
  }, [total.value]);

  useEffect(() => {
    MyApplyApi({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
    }).then((res) => {
      // console.log(res);
      console.log(res.total);
      total.set(res.total);
      data.set(res.challenge);
    });
  }, [page.value, pageSize.value, orderby.value, keyword.value]);

  function previous(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (page.value !== 1) {
      page.set((prev: number) => prev - 1);
    }
  }
  function next(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (page.value !== pageNation.value.length) {
      if (page.value % pageSize.value === 0) {
        console.log(page.value % pageSize.value);
        pageStartNum.set((prev) => prev + pageSize.value);
      }
      page.set((prev: number) => prev + 1);
    }
  }
  return (
    <div className={s.apply}>
      <ul className={s.applyList}>
        {!!data.value.length && (
          <li className={s.labels}>
            <div className={s.no}>No.</div>
            <div className={s.documentType}>분야</div>
            <div className={s.field}>카테고리</div>
            <div className={s.title}>챌린지 제목</div>
            <div className={s.people}>인원</div>
            <div className={s.createdAt}>신청일</div>
            <div className={s.finish}>마감 기한</div>
            <div className={s.state}>상태</div>
          </li>
        )}
        {!!data.value.length ? (
          data.value.map((v: Challenge) => {
            const createdAt = textDate(v.createdAt);
            const finish = textDate(v.date);
            return (
              <li key={v.id}>
                <div className={s.no}>{v.id}</div>
                <div className={s.documentType}>{v.documentType}</div>
                <div className={s.field}>{v.field}</div>
                <div className={s.title}>{v.title}</div>
                <div className={s.people}>
                  {v.current}/{v.maximum}
                </div>
                <div className={s.createdAt}>{createdAt}</div>
                <div className={s.finish}>{finish}</div>
                <div className={s.state}>{v.state}</div>
              </li>
            );
          })
        ) : (
          <li className={s.noList}>
            <p>신청한 챌린지가 없어요</p>
          </li>
        )}
      </ul>
      {!!total.value && (
        <div className={s.pageNavigation}>
          <button
            className={`${s.arrow} ${s.left} ${
              page.value === 1 && s.disable
            }`.trim()}
            onClick={previous}
          >{`<`}</button>
          <ul className={s.number}>
            {pageNation.value.map((v: number, i: number) => {
              return (
                <li
                  key={`${v} ${i}`}
                  className={page.value === v ? s.onPage : "navi"}
                >
                  <Link
                    href={`${v}`}
                    onClick={(e) => {
                      e.preventDefault();
                      page.set(Number(v));
                    }}
                  >
                    {v}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className={`${s.arrow} ${s.right} ${
              page.value === total.value / pageSize.value && s.disable
            }`.trim()}
            onClick={next}
          >{`>`}</button>
        </div>
      )}
    </div>
  );
}
