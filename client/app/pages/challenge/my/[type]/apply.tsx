"use client";
import useValue from "@/app/shared/hooks/useValue";
import s from "./styles/apply.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { MyApplyApi } from "@/app/api/challenge/api";

export default function Apply({}) {
  const data = useValue([]);
  const total = useValue(0);
  const page = useValue(1);
  const pageSize = useValue(10);
  const orderby = useValue("applicationDate");
  const keyword = useValue("");
  const pageNation = useValue([]);
  useEffect(() => {
    pageNation.set(
      Array.from(
        {
          length: Math.ceil(total.value / pageSize.value),
        },
        (_, i) => {
          return i + 1;
        }
      )
    );
  }, [total.value]);

  useEffect(() => {
    console.log("??");

    MyApplyApi({
      page: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
    }).then((res) => {
      console.log(res);
      data.set(res.data);
    });
  }, [page.value, pageSize.value, orderby.value, keyword.value]);
  function previous() {}
  function next() {}
  console.log(data.value);
  return (
    <div className={s.apply}>
      <ul className={s.apply}>
        {!!data.value.length ? (
          data.value.map((v: any) => {
            return <li key={v}>{v}</li>;
          })
        ) : (
          <li className={s.noList}>
            <p>신청한 챌린지가 없어요</p>
          </li>
        )}
      </ul>
      {!!total.value && (
        <div className={s.pageNavigation}>
          <button onClick={previous}>{`<`}</button>
          <ul className={s.number}>
            {pageNation.value.map((v: number, i: number) => {
              return (
                <li key={`${v} ${i}`}>
                  <Link href={`${v}`}>{v}</Link>
                </li>
              );
            })}
          </ul>
          <button onClick={next}>{`>`}</button>
        </div>
      )}
    </div>
  );
}
