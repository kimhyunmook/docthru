"use client";

import Chip from "@/app/shared/components/chip/chip";
import Image from "next/image";
import s from "./detail.module.css";
import Container from "@/app/shared/components/container/container";
import { useEffect, useState } from "react";
import { DetailChallenge, WorkPageGet } from "@/app/service/challenge/api";
import { useParams } from "next/navigation";
import useValue from "@/app/shared/hooks/useValue";
import List from "@/app/shared/components/list";
import { WorkContent, type Challenge } from "@/app/shared/types/common";
import CodeEditor from "@/app/shared/components/codeEditer";

interface ChallengeData extends Challenge {
  oner: {
    nickname: string;
  };
}

export default function Detail() {
  const params = useParams();
  const { id } = params;
  const chipElement = useValue(<></>);

  const [data, setData] = useState<ChallengeData>();
  const [participation, setParticipation] = useState<WorkContent[]>([]);

  useEffect(() => {
    DetailChallenge({ id: `${id}` }).then((res) => {
      console.log("DetailChallenge", res.data);
      setData(res.data);
    });
    WorkPageGet({ id: `${id}` }).then((res) => {
      setParticipation(res.data);
      console.log(
        res.data.map((value: { id: string }) => {
          console.log("value.id", value.id);
          return value.id;
        })
      );
    });
    // WorkPageGet({ id: `${id}` }).then((res) => {
    //   console.log(res.data);
    // });
  }, []);

  useEffect(() => {
    switch (data?.field?.toLocaleLowerCase()) {
      case "next.js":
        chipElement.set(<Chip.NextChip />);
        break;
      case "api":
        chipElement.set(<Chip.ApiChip />);
        break;
      case "career":
        chipElement.set(<Chip.CareerChip />);
        break;
      case "modern js":
        chipElement.set(<Chip.ModernChip />);
        break;
      case "web":
        chipElement.set(<Chip.WebChip />);
        break;
    }
  }, [data]);

  if (!!data)
    return (
      <div className={s.total}>
        <div className={s.inner}>
          <div className={s.content_box}>
            <div className={s.title_box}>
              <h2>{data?.title}</h2>
              <Image
                src="/img/icon/menu_bar.svg"
                alt="메뉴"
                width={24}
                height={24}
              />
            </div>
            <div className={s.chip_box}>
              {data.field && chipElement.value}
              {data.documentType && (
                <Chip.Categori>{data.documentType}</Chip.Categori>
              )}
            </div>
            <div className={s.text_box}>
              {data.codeContent && (
                <CodeEditor
                  value={data.codeContent}
                  height="150px"
                  readonly={true}
                  label={false}
                  style={{ marginBottom: "20px" }}
                />
              )}
              <p>{data.content}</p>
              <div className={`${s.content}`}>
                <Image
                  src="/img/icon/profile_member.svg"
                  alt="아이콘"
                  width={30}
                  height={30}
                />
                <p className={s.user}>{data.oner.nickname}</p>
              </div>
            </div>
          </div>
          <Container
            className={s.containerRight}
            buttonAbled={{
              originalLink: !!data.originalLink,
              challengeLink: true,
            }}
            current={data.current}
            total={data.maximum}
            date={data.date}
          />
        </div>
        <div className={s.bottom}>
          <span></span>
          <div className={s.list_box}>
            <div className={s.list_top}>
              <h2>참여 현황</h2>
              <div className={s.top_right}>
                <div className={s.list_page_num}>
                  <span>
                    {data.current}/{data.maximum}
                  </span>
                </div>
                <div className={s.arrow}>
                  <span className={s.left}></span>
                  <span className={s.right}></span>
                </div>
              </div>
            </div>
            {participation.map((v: WorkContent, index: number) => {
              const isLast = index === participation.length - 1; // 마지막 요소인지 확인
              return (
                <List
                  number={index + 1}
                  key={v?.id}
                  user={v.user}
                  isLast={isLast}
                  listId={v.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
}
