"use client";
import useValue from "@/app/shared/hooks/useValue";
import s from "./styles/apply.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { MyApplyApi } from "@/app/api/challenge/api";

export default function Apply({}) {
  const data = useValue([
    {
      id: "1",
      title: "1",
    },
    {
      id: "2",
      title: "2",
    },
  ]);
  const total = useValue(11);
  const page = useValue(1);
  const pageSize = useValue(10);
  const orderby = useValue("createdAt");
  const keyword = useValue("");
  const pageNation = useValue([]);

  useEffect(() => {
    pageNation.set(
      Array.from(
        {
          length: Math.ceil(total.value / pageSize.value),
        },
        (_, i) => i + 1
      )
    );
  }, [total.value]);

  useEffect(() => {
    MyApplyApi({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
    }).then((res) => {
      //   console.log(res);
      //   data.set(res.data);
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
          data.value.map((v: any) => {
            return (
              <li key={v.id}>
                <div className={s.no}>1029</div>
                <div className={s.documentType}>분야</div>
                <div className={s.field}>카테고리</div>
                <div className={s.title}>챌린지 제목</div>
                <div className={s.people}>인원</div>
                <div className={s.createdAt}>신청일</div>
                <div className={s.finish}>마감 기한</div>
                <div className={s.state}>상태</div>
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
              page.value === pageNation.value.length && s.disable
            }`.trim()}
            onClick={next}
          >{`>`}</button>
        </div>
      )}
    </div>
  );
}
