"use client";
import { PropsWithChildren, useEffect } from "react";
import Tab from "@/app/shared/components/tab/tab";
import s from "./my.module.css";
import SearchInput from "@/app/shared/components/search";
import useValue from "@/app/shared/hooks/useValue";
import { useAuth } from "@/app/shared/provider/authProvider";
import { useRouter } from "next/navigation";

export default function MyChallengeLayout({ children }: PropsWithChildren) {
  const keyword = useValue("");
  const { user } = useAuth();
  const router = useRouter();

  function search() {}
  useEffect(() => {
    if (!!!user) router.push("/");
  }, []);
  return (
    <div className={s.container}>
      <h2>나의 챌린지</h2>
      <div className={s.tabBox}>
        <Tab className={s.tab}>참여중인 챌린지</Tab>
        <Tab className={s.tab}>완료한 챌린지</Tab>
        <Tab className={s.tab}>신청한 챌린지</Tab>
      </div>
      <div className={s.top}>
        <SearchInput
          className={s.search}
          value={keyword.value}
          setValue={keyword.set}
          onClick={search}
        />
      </div>
      {children}
    </div>
  );
}
