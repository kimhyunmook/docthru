"use client";
import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "@/app/api/instance";
import { useEffect } from "react";

// API 호출 함수: 기본 pageParam은 1
const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await instance.get(`/api/challenge/?page=${pageParam}`);
  console.log(pageParam);
  return data;
};

const InfiniteScrollComponent = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextPage) return undefined;
      if (lastPage.data.length === 0) return undefined;

      // 그 외의 경우 정상적으로 nextPage 반환
      return lastPage.nextPage;
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    // 컨테이너의 전체 스크롤 높이에서 현재 스크롤 위치와 컨테이너 높이를 뺀 값이 50px 미만이면 추가 데이터를 요청
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
    <div
      ref={scrollRef}
      style={{
        height: "80vh",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "8px",
      }}
    >
      {data.pages.map((page, pageIndex) =>
        page.data.map((post: any) => (
          <div
            key={post.id}
            style={{ padding: "16px", borderBottom: "1px solid #eee" }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
      {isFetchingNextPage && (
        <div style={{ padding: "16px" }}>추가 로딩 중...</div>
      )}
    </div>
  );
};

export default InfiniteScrollComponent;
