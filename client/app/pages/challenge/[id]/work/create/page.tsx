"use client";

import LinkImg from "../../../../../shared/components/LinkImg";
import Btn from "@/app/shared/components/btn/btn";
import s from "./workcreate.module.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { WorkContent } from "@/app/shared/types/common";
import { WorkPagePost } from "@/app/service/challenge/api";
import CodeEditor from "../../../../../shared/components/codeEditer";

export default function ChallengeWorkCreate() {
  const router = useRouter();
  const { id } = useParams();
  console.log("id", id);

  const [workContent, setWorkContent] = useState<WorkContent>({
    title: "제목을 입력해주세요",
    content: "번역 내용을 입력해주세요",
    id: Number(id),
    user: {
      id: "",
      nickname: "",
      grade: "일반",
      like: 0,
    },
  });
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!id) return;

    const savedData = localStorage.getItem(`tempContent-${id}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as WorkContent;
        setWorkContent(parsedData);
      } catch (error) {
        console.error("Failed to parse saved content:", error);
      }
    }
  }, [id]);

  const handleTempSave = () => {
    if (!id) return;
    localStorage.setItem(`tempContent-${id}`, JSON.stringify(workContent));
    // console.log(`tempContent-${id}`, JSON.stringify(placeholder));
    if (
      workContent.title === "제목을 입력해주세요" ||
      workContent.content === "번역 내용을 입력해주세요"
    ) {
      alert("제목과 내용을 입력하세요");
      return;
    } else alert("임시 저장되었습니다.");
  };

  const handleClick = () => {
    if (
      workContent.title === "제목을 입력해주세요" ||
      workContent.content === "번역 내용을 입력해주세요"
    ) {
      alert("제목과 내용을 입력하세요");
      return;
    } else alert("제출 되었습니다.");
    console.log(workContent);
    WorkPagePost({ ...workContent, id: Number(id) });
    router.push(`/pages/challenge/${id}`);
  };

  return (
    <div className={s.inner}>
      <div className={s.nav}>
        <LinkImg
          className={s.logo}
          href="/"
          src="/img/logo.svg"
          alt="docthru"
          width={108}
          height={31}
        />
        <div className={s.btn_box}>
          <Btn.Filled.Regular
            onClick={() => {
              router.push(`/pages/challenge/${id}`);
            }}
            icon={true}
            style={{ height: 40 }}
          >
            포기
          </Btn.Filled.Regular>
          <Btn.Outline.Regular onClick={handleTempSave}>
            임시저장
          </Btn.Outline.Regular>
          <Btn.Solid.Regular onClick={handleClick}>제출하기</Btn.Solid.Regular>
        </div>
      </div>
      <div className={s.content}>
        <input
          placeholder={workContent.title}
          value={workContent.title}
          onFocus={() => {
            if (workContent.title === "제목을 입력해주세요")
              setWorkContent((prev) => ({
                ...prev,
                title: "",
              }));
          }}
          onBlur={() => {
            if (workContent.title === "") {
              setWorkContent((prev) => ({
                ...prev,
                title: "제목을 입력해주세요",
              }));
              return;
            }
          }}
          onChange={(e) =>
            setWorkContent((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <CodeEditor dispatch={setCode} />

        <span></span>
        <div className={s.text_deco_box}>글씨 굵기나 정렬 등등 칸(임시)</div>
        <textarea
          placeholder={workContent.content}
          value={workContent.content}
          onFocus={() => {
            if (workContent.content === "번역 내용을 입력해주세요")
              setWorkContent((prev) => ({
                ...prev,
                content: "",
              }));
          }}
          onBlur={() => {
            if (workContent.content === "") {
              setWorkContent((prev) => ({
                ...prev,
                content: "번역 내용을 입력해주세요",
              }));
              return;
            }
          }}
          onChange={(e) =>
            setWorkContent((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
}
