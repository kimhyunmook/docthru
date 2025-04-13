"use client";
import useValue from "@/app/shared/hooks/useValue";
import s from "./styles/apply.module.css";
import { useEffect } from "react";
import { MyApplyApi } from "@/app/service/challenge/api";
import { Challenge, StateType } from "@/app/shared/types/common";
import textDate from "@/app/shared/hooks/textDate";
import PageNation from "./pageNation";
import Chip from "@/app/shared/components/chip/chip";
import Link from "next/link";

export default function Apply({}) {
  const data = useValue([]);
  const total = useValue(0);
  const page = useValue(1);
  const pageSize = useValue(10);
  const orderby = useValue("createdAt");
  const keyword = useValue("");
  const pageStartNum = useValue<number>(1);

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
      if (page.value % pageSize.value === 1) {
        pageStartNum.set((prev) => prev - pageSize.value);
        // pageLastNum.set()
      }
      page.set((prev: number) => prev - 1);
    }
  }
  function next(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (page.value !== Math.ceil(total.value / pageSize.value)) {
      if (page.value % pageSize.value === 0) {
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
                <div className={s.title}>
                  <Link href={`/pages/chllange/${v.id}`}>{v.title}</Link>
                </div>
                <div className={s.people}>
                  {v.current}/{v.maximum}
                </div>
                <div className={s.createdAt}>{createdAt}</div>
                <div className={s.finish}>{finish}</div>
                <div className={s.state}>
                  <StateChip type={v.state} />
                </div>
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
        <PageNation
          previous={previous}
          next={next}
          page={page.value}
          pageSet={page.set}
          pageSize={pageSize.value}
          total={total.value}
          startNum={pageStartNum.value}
        />
      )}
    </div>
  );
}

function StateChip({ type }: { type: StateType }) {
  const chip = useValue<React.ReactNode>(<Chip.Accecpt />);
  useEffect(() => {
    switch (type) {
      case "inProgress":
        chip.set(<Chip.Accecpt />);
        break;
      case "pending":
        chip.set(<Chip.Pending />);
        break;
      case "delete":
        chip.set(<Chip.Delete />);
        break;
      case "reject":
        chip.set(<Chip.Reject />);
        break;
    }
  }, [type]);
  return <>{chip.value}</>;
}
