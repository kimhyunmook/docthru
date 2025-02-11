"use client";

import LinkImg from "../../../../../shared/components/LinkImg";
import Btn from "@/app/shared/components/btn/btn";
import s from "./workcreate.module.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Placeholder } from "@/app/shared/types/common";
import { WorkPagePost } from "@/app/api/challenge/api";

export default function ChallengeWorkCreate() {
  const router = useRouter();
  const { id } = useParams();
  console.log("id", id);

  const [placeholder, setPlaceholder] = useState<Placeholder>({
    title: "제목을 입력해주세요",
    content: "번역 내용을 입력해주세요",
    id: Number(id),
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

  const handleClick = () => {
    if (
      placeholder.title === "제목을 입력해주세요" ||
      placeholder.content === "번역 내용을 입력해주세요"
    ) {
      alert("제목과 내용을 입력하세요");
      return;
    } else alert("제출 되었습니다.");
    console.log(placeholder);
    // WorkPagePost(placeholder); // 이건 처음 저장해둔 state값은 num인데 받아오는 처음 id값이 string이라 오류가 나는거였음

    WorkPagePost({ ...placeholder, id: Number(id) }); // 이렇게 바꿔서 실행시킬 수 있게 됨
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
