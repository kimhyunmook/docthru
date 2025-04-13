"use client";

import s from "./workpage.module.css";
import Image from "next/image";
import Chip from "@/app/shared/components/chip/chip";
import Reply from "@/app/shared/components/reply/reply";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { WorklistGet } from "@/app/api/challenge/api";

export default function WorkPage() {
  const [textarea, setTextarea] = useState("");
  const [data, setData] = useState({
    title: "",
    content: "",
    userName: "",
  });
  const params = useParams();
  const { id, listId } = params;
  console.log(id);
  console.log(listId);

  useEffect(() => {
    if (!listId || !id) return;
    WorklistGet({ id: `${id}` }, { listId: `${listId}` })
      .then((res) => {
        if (!res) return;
        console.log("res", res);
        console.log("리스트상세[listID]page", res);
        setData({
          title: res.title,
          content: res.content,
          userName: res.user.nickname, // 👈 nickname만 뽑아서 넣기
        });
      })
      .catch((err) => console.error(err));
  }, [id, listId]);

  console.log("data", data);
  return (
    <div className={s.container}>
      <h2>{listId}</h2>
      <div className={s.chip_container}>
        <Chip.CareerChip />
        <Chip.Categori>블로그</Chip.Categori>
      </div>
      <div className={s.user_container}>
        <div className={s.left_box}>
          <div className={`${s.user_box}`}>
            <Image
              src="/img/icon/profile_member.svg"
              alt="아이콘"
              width={30}
              height={30}
            />
            <p className={s.user}>닉네임</p>
          </div>
          <div className={s.like_box}>
            <Image
              src="/img/icon/line_heart.svg"
              alt="아이콘"
              width={16}
              height={16}
            />
            <span>1,934</span>
          </div>
        </div>
        <span>24/02/28</span>
      </div>
      <p>내용</p>
      <div className={s.feedback_box}>
        <div className={s.feedback_top}>
          <Reply.Textarea
            userName=""
            value={textarea}
            setValue={setTextarea}
            className={s.feedback}
          />
          <Image
            src="/img/icon/down_arrow.svg"
            alt="아이콘"
            width={40}
            height={40}
            // onClick={}
          />
        </div>
        <Reply userName="밥볶이의 달인 박복자" date="24/01/17 15:38" />
      </div>
    </div>
  );
}
