"use client";
import styles from "@/app/shared/styles/container.module.css";
import Btn from "../btn/btn";
import Info, { InfoProps } from "./info";
import { useRouter, useParams } from "next/navigation";
import { ApplyChallengeApi } from "@/app/service/challenge/api";
import { useModal } from "../../provider/modalProvider";
import { useEffect } from "react";
import { useToaster } from "../../provider/toasterProvider";
import { useAuth } from "../../provider/authProvider";

<<<<<<< HEAD
interface ContainerProps extends InfoProps {
  buttonAbled?: {
    originalLink?: boolean;
    challengeLink?: boolean;
  };
  originalLink?: string;
=======
interface Container extends InfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>>>>>>> b1e39d0 (a)
}

function Container({
  className,
  date = "0000년 0월 0일",
  current = 0,
  total = 0,
  originalLink,
  buttonAbled,
}: ContainerProps) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { user } = useAuth();
  const { modalOepn, title, modalClose, buttons } = useModal();
  const toast = useToaster();

  const modalButtonEvent = () => {
    if (id && typeof id === "string")
      ApplyChallengeApi({ id }).then((res) => {
        if (res) modalClose();
        else toast("warn", "실패하였습니다.");
      });
    modalClose();
    router.push(`/pages/challenge/${id}/work/create`);
  };

  useEffect(() => {
    console.log(user);
    title("챌린지를 신청하시겠습니까?");
    buttons(
      <>
        <Btn.Filled.Regular onClick={modalClose}>취소</Btn.Filled.Regular>
<<<<<<< HEAD
        <Btn.Solid.Regular onClick={modalButtonEvent}>신청</Btn.Solid.Regular>
=======
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
>>>>>>> b1e39d0 (a)
      </>
    );
  }, []);

  return (
    <div className={`${styles.container} flexCenter ${className}`}>
      <div className={styles.top}>
        <Info date={date} current={current} total={total} />
      </div>
      <div className={styles.btnArea}>
        {buttonAbled?.originalLink ? (
          <Btn.Filled.Yellow
            className=""
            onClick={() => {
              router.push(originalLink!);
            }}
          >
            원문 보기
          </Btn.Filled.Yellow>
        ) : (
          <Btn.Outline.Small className={styles.disabled}>
            원문 보기
          </Btn.Outline.Small>
        )}
        <Btn.Solid.Regular
          onClick={() => {
            modalOepn();
          }}
        >
          작업 도전하기
        </Btn.Solid.Regular>
      </div>
    </div>
  );
}

export default Container;
