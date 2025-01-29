"use client";

import Input from "@/app/shared/components/input/input";
import s from "./application.module.css";
import React, { PropsWithChildren, useState } from "react";
import Btn from "@/app/shared/components/btn/btn";
import { PostChallenge } from "@/app/api/challenge/api";

interface bodyProps extends PropsWithChildren {
  mainTitle: string;
  setData: React.Dispatch<React.SetStateAction<Form>>;
}

type Form = {
  title: string;
  originalLink: string;
  field: string;
  date: string;
  maximum: string;
  content: string;
};

export default function Application({
  mainTitle,
  children,
  setData,
}: bodyProps) {
  const [form, setForm] = useState<Form>({
    title: "",
    originalLink: "",
    field: "",
    date: "",
    maximum: "",
    content: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClick() {
    console.log(form);
    PostChallenge(form);
  }

  return (
    <div className={s.application}>
      <h2>{mainTitle ? mainTitle : "신규 챌린지 신청"}</h2>
      <Input
        label="제목"
        name="title"
        placeholder="제목을 입력해주세요"
        onChange={handleChange}
      />
      <Input
        label="원문 링크"
        name="originalLink"
        placeholder="원문 링크를 입력해주세요"
        onChange={handleChange}
      />
      <Input
        label="분야"
        name="field"
        placeholder="카테고리"
        onChange={handleChange}
      />
      <Input
        label="문서 타입"
        name="field"
        placeholder="카테고리"
        onChange={handleChange}
      />
      <Input.Date name="date" onChange={handleChange} />
      <Input
        label="최대 인원"
        name="maximum"
        placeholder="인원을 입력해주세요"
        onChange={handleChange}
      />
      <div className={s.constent_box}>
        <span>내용</span>
        <textarea
          name="content"
          className={s.textarea}
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
        ></textarea>
      </div>
      {!!children ? (
        children
      ) : (
        <Btn.Solid.Large onClick={handleClick} className={s.bt_l} width="100%">
          신청하기
        </Btn.Solid.Large>
      )}
    </div>
  );
}
