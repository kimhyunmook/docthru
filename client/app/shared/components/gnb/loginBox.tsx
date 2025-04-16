"use client";
import styles from "@/app/shared/styles/loginBox.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkImg from "../LinkImg";
import Dropdown from "../dropdown/dropdown";
import { usePathname } from "next/navigation";
import { useAuth } from "../../provider/authProvider";
// import { useQuery } from "@tanstack/react-query";
// import { getAlramApi } from "@/app/service/user/api";
// import Alarm, { AlarmProps } from "./alarm";
// import useValue from "../../hooks/useValue";
// import { useQueryClient } from "@tanstack/react-query";

type LoginBoxT = {
  admin: boolean;
};

type ModalState = {
  [key: string]: boolean;
  alarm: boolean;
};

const init: ModalState = {
  alarm: false,
};

export default function LoginBox({}: LoginBoxT) {
  const { user } = useAuth();
  // const { data, isFetched, isRefetching } = useQuery({
  //   queryKey: ["alarm"],
  //   queryFn: () => {
  //     return getAlramApi();
  //   },
  //   // staleTime: 10 * 1000,
  //   staleTime: Infinity,
  //   enabled: !!user,
  //   refetchInterval: 10 * 1000,
  //   refetchOnWindowFocus: true,
  // });
  const [modalState, setModalState] = useState(init);

  function openModal({ type }: { type: string }) {
    setModalState((prev) => ({ ...prev, [type]: !prev[type] }));
  }
  // const alarm = useValue<AlarmProps[]>(
  //   data?.alarm.filter((x: AlarmProps) => !x.read) || []
  // );

  // useEffect(() => {
  //   if (isFetched || isRefetching)
  //     alarm.set(data.alarm.filter((x: AlarmProps) => !x.read));
  // }, [isFetched, isRefetching]);

  const path = usePathname();
  useEffect(() => {
    setModalState({
      alarm: false,
      user: false,
    });
  }, [path]);

  return (
    <div className={styles.loginBox}>
      {!!!user ? (
        <Link
          className={`${styles.loginBtn} flexCenter`}
          href="/pages/auth/login"
        >
          로그인
        </Link>
      ) : (
        <>
          <div className={styles.itemBox}>
            {/* <LinkImg
              href={"#"}
              alt="알람"
              src={
                !!alarm.value.length
                  ? "/img/icon/alarm_noti.svg"
                  : "/img/icon/alarm.svg"
              }
              width={18}
              height={18}
              onClick={() => {
                openModal({ type: "alarm" });
              }}
            /> */}
            {/* {modalState.alarm && <Alarm />} */}
          </div>
          <div className={styles.itemBox}>
            <LinkImg
              href={"#"}
              alt="유저"
              src={"/img/icon/profile_member.svg"}
              width={32}
              height={32}
              onClick={() => {
                openModal({ type: "user" });
              }}
            />
            {modalState.user && <Dropdown.Login className={styles.modal} />}
          </div>
        </>
      )}
    </div>
  );
}
