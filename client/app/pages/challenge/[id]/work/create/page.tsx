"use client";

import LinkImg from "../../../../../shared/components/LinkImg";
import Btn from "@/app/shared/components/btn/btn";
import s from "./workcreate.module.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChallengeWorkCreate() {
  const router = useRouter();
  const { id } = useParams();

  interface Placeholder {
    title: string;
    content: string;
  }

  // ✅ title과 content 상태를 함께 관리
  const [placeholder, setPlaceholder] = useState<Placeholder>({
    title: "제목을 입력해주세요",
    content: "번역 내용을 입력해주세요",
  });

  useEffect(() => {
    if (!id) return; // id가 없으면 실행하지 않음

    const savedData = localStorage.getItem(`tempContent-${id}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Placeholder;
        setPlaceholder(parsedData);
      } catch (error) {
        console.error("Failed to parse saved content:", error);
      }
    }
  }, [id]);

  const handleTempSave = () => {
    if (!id) return;
    localStorage.setItem(`tempContent-${id}`, JSON.stringify(placeholder));
    // console.log(`tempContent-${id}`, JSON.stringify(placeholder));
    if (
      placeholder.title === "제목을 입력해주세요" ||
      placeholder.content === "번역 내용을 입력해주세요"
    ) {
      alert("제목과 내용을 입력하세요");
      return;
    } else alert("임시 저장되었습니다.");
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
          <Btn.Solid.Regular>제출하기</Btn.Solid.Regular>
        </div>
      </div>
      <div className={s.content}>
        <input
          placeholder={placeholder.title}
          value={placeholder.title}
          onFocus={() => {
            if (placeholder.title === "제목을 입력해주세요")
              setPlaceholder((prev) => ({
                ...prev,
                title: "",
              }));
          }}
          onBlur={() => {
            if (placeholder.title === "") {
              setPlaceholder((prev) => ({
                ...prev,
                title: "제목을 입력해주세요",
              }));
              return;
            }
          }}
          onChange={(e) =>
            setPlaceholder((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <span></span>
        <div className={s.text_deco_box}>글씨 굵기나 정렬 등등 칸(임시)</div>
        <textarea
          placeholder={placeholder.content}
          value={placeholder.content}
          onFocus={() => {
            if (placeholder.content === "번역 내용을 입력해주세요")
              setPlaceholder((prev) => ({
                ...prev,
                content: "",
              }));
          }}
          onBlur={() => {
            if (placeholder.content === "") {
              setPlaceholder((prev) => ({
                ...prev,
                content: "번역 내용을 입력해주세요",
              }));
              return;
            }
          }}
          onChange={(e) =>
            setPlaceholder((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
}
