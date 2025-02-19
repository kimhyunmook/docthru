"use client";
import Btn from "@/app/shared/components/btn/btn";
import s from "./challenge.module.css";
import SearchInput from "@/app/shared/components/search";
import Card from "@/app/shared/components/card/card";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { GetChallenge } from "@/app/api/challenge/api";
import type {
  Challenge,
  ChallengeFilterProps,
  FieldType,
} from "@/app/shared/types/common";
import DropFilter from "@/app/shared/components/dropdown/filter";
import useValue from "@/app/shared/hooks/useValue";
import { useInfiniteQuery } from "@tanstack/react-query";

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollLine = window.innerHeight + window.scrollY + 200;
  //     if (!!!challenge.current) return;
  //     const listHeight = challenge.current.getBoundingClientRect().height;
  //     if (data.length === total.value) return;
  //     if (scrollLine >= listHeight && isFatching.value) {
  //       page.set((prev) => prev + 1);
  //       isFatching.set(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isFatching.value, total.value]);

  // useEffect(() => {
  //   GetChallenge({
  //     page: page.value,
  //     pageSize: pageSize.value,
  //     orderby: orderby.value,
  //     keyword: keyword.value,
  //     filter: filter.value,
  //   }).then((res) => {
  //     total.set(res.total);
  //     isFatching.set(true);
  //     setData((prev) => [...prev, ...res.data]);
  //   });
  // }, [page.value, pageSize.value, orderby.value]);

  // useEffect(() => {
  //   getData();
  // }, [filter.value]);

  function filterHandle() {
    setFilterOpen((prev) => !prev);
  }

  function getData() {
    GetChallenge({
      pageParam: page.value,
      pageSize: pageSize.value,
      orderby: orderby.value,
      keyword: keyword.value,
      filter: filter.value,
    }).then((res) => {
      total.set(res.total);
      setData(() => [...res.data]);
    });
  }

  const {
    data: scrollData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: () =>
      GetChallenge({
        pageParam: 1,
        pageSize: pageSize.value,
        orderby: orderby.value,
        keyword: keyword.value,
        filter: filter.value,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log("lastPaeg", lastPage);
      if (!lastPage.nextPage) return undefined;
      if (lastPage.data.length === 0) return undefined;

      // 그 외의 경우 정상적으로 nextPage 반환
      return lastPage.nextPage;
    },
  });

  // console.log(scrollData);

  const scrollRef = useRef<HTMLUListElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    if (
      container.scrollHeight - container.scrollTop - container.clientHeight <
      50
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // 스크롤 이벤트 리스너 등록
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (status === "error") return <div>Error: {error.message}</div>;
  if (status === "pending") return <div>로딩 중...</div>;

  return (
    <div ref={challenge} className={s.challenge} style={{}}>
      <div className={s.top}>
        <h2>챌린지 목록</h2>
        <Link href={`/pages/challenge/create`}>
          <Btn.Solid.Regular className={s.createBtn}>
            신규 챌린지 신청 +
          </Btn.Solid.Regular>
        </Link>
      </div>
      <div className={s.content}>
        <div className={s.search_box}>
          <DropFilter
            open={filterOpen}
            setOpen={setFilterOpen}
            onClick={filterHandle}
            setFilter={filter.set}
            setPage={page.set}
          />
          <SearchInput
            value={keyword.value}
            setValue={keyword.set}
            className={s.search}
            onClick={getData}
          ></SearchInput>
        </div>
        <ul className={s.list} ref={scrollRef}>
          {scrollData.pages.length === 0 ? (
            <li className={s.noList}>챌린지가 없어요</li>
          ) : (
            scrollData.pages.map((page, pageIndex) =>
              page.data.map((v: Challenge, i: number) => {
                return (
                  <li key={i}>
                    <Card
                      cardId={v.id}
                      href={`/pages/challenge/${v.id}`}
                      field={v.field as FieldType}
                      documentType={v.documentType}
                      className={``}
                      state={v.state}
                      date={v.date}
                      current={v.current}
                      maximum={v.maximum}
                      onerId={v.onerId}
                    >
                      {v.title}
                    </Card>
                  </li>
                );
              })
            )
            // data.map((v: Challenge, i) => {
            //   return (
            //     <li key={i}>
            //       <Card
            //         cardId={v.id}
            //         href={`/pages/challenge/${v.id}`}
            //         field={v.field as FieldType}
            //         documentType={v.documentType}
            //         className={``}
            //         state={v.state}
            //         date={v.date}
            //         current={v.current}
            //         maximum={v.maximum}
            //         onerId={v.onerId}
            //       >
            //         {v.title}
            //       </Card>
            //     </li>
            //   );
            // })
          )}
        </ul>
      </div>
    </div>
  );
}
