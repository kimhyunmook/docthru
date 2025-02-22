"use client";
import { PropsWithChildren, useEffect } from "react";
import Tab from "@/app/shared/components/tab/tab";
import s from "./styles/my.module.css";
import SearchInput from "@/app/shared/components/search";
import useValue from "@/app/shared/hooks/useValue";
import { useAuth } from "@/app/shared/provider/authProvider";
import { useParams, usePathname, useRouter } from "next/navigation";
import Btn from "@/app/shared/components/btn/btn";
import Link from "next/link";

export default function MyChallengeLayout({ children }: PropsWithChildren) {
  const keyword = useValue("");
  const { user, isFetching, isLoading } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  function search() {}
  useEffect(() => {
    if (isLoading) return;
    if (!!!user && isFetching) router.push("/");
  }, []);

  function active(type: string) {
    return type === String(params.type);
  }

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h2>나의 챌린지</h2>
        <Link href="/pages/challenge/create">
          <Btn.Solid.Regular>+ 챌린지 신청하기</Btn.Solid.Regular>
        </Link>
      </div>
      <div className={s.tabBox}>
        <Tab.Middle
          href="participating"
          active={active("participating")}
          className={s.tab}
        >
          참여중인 챌린지
        </Tab.Middle>
        <Tab.Middle href="finish" active={active("finish")} className={s.tab}>
          완료한 챌린지
        </Tab.Middle>
        <Tab.Middle href="apply" active={active("apply")} className={s.tab}>
          신청한 챌린지
        </Tab.Middle>
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
