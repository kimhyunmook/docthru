"use client";
import { PropsWithChildren, useEffect } from "react";
import Tab from "@/app/shared/components/tab/tab";
import s from "./styles/my.module.css";
import SearchInput from "@/app/shared/components/search";
import useValue from "@/app/shared/hooks/useValue";
import { useAuth } from "@/app/shared/provider/authProvider";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MyChallengeProps } from "@/app/shared/types/common";

export default function MyChallengeLayout({ children }: PropsWithChildren) {
  const keyword = useValue("");
  const { user, isFetching } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  function search() {}
  useEffect(() => {
    // if (!!!user && isFetching) router.push("/");
  }, []);

  function active(type: MyChallengeProps) {
    return type === params.type;
  }
  return (
    <div className={s.container}>
      <h2>나의 챌린지</h2>
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
