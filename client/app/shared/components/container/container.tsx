"use client";
import styles from "@/app/shared/styles/container.module.css";
import Btn from "../btn/btn";
import Info, { InfoProps } from "./info";
import { useRouter, useParams } from "next/navigation";
import { ApplyChallengeApi } from "@/app/api/challenge/api";
import { useModal } from "../../provider/modalProvider";
import { useEffect } from "react";
import { useToaster } from "../../provider/toasterProvider";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ContainerProps extends InfoProps {
}

function Container({
  date = "0000년 0월 0일",
  current = 0,
  total = 0,
}: ContainerProps) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { modalOepn, title, modalClose, buttons } = useModal();
  const toast = useToaster();

  useEffect(() => {
    title("챌린지를 신청하시겠습니까?");
    buttons(
      <>
        <Btn.Filled.Regular onClick={modalClose}>취소</Btn.Filled.Regular>
        <Btn.Solid.Regular
          onClick={() => {
            if (id && typeof id === "string")
              ApplyChallengeApi({ id }).then((res) => {
                if (res) modalClose();
                else toast("warn", "실패하였습니다.");
              });
            modalClose();
            router.refresh();
          }}
        >
          신청
        </Btn.Solid.Regular>
      </>
    );
  }, []);

  return (
    <div className={`${styles.container} flexCenter`}>
      <div className={styles.top}>
        <Info date={date} current={current} total={total} />
      </div>
      <div className={styles.btnArea}>
        <Btn.Filled.Yellow>원문 보기</Btn.Filled.Yellow>
        <Btn.Solid.Regular
          onClick={() => {
            modalOepn();
            // router.push(`/pages/challenge/${id}/work/create`);
          }}
        >
          작업 도전하기
        </Btn.Solid.Regular>
      </div>
    </div>
  );
}

export default Container;
