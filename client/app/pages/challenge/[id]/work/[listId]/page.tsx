"use client";

import s from "./workpage.module.css";
import Image from "next/image";
import Chip from "@/app/shared/components/chip/chip";
import Reply from "@/app/shared/components/reply/reply";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CreateCommentApi, WorklistGet } from "@/app/service/challenge/api";
import { format } from "date-fns";

type CommentType = {
  user: { nickname: string };
  content: string;
  updatedAt: string;
};

type Feedback = {
  content: string;
  updatedAt: string;
  user: {
    nickname: string;
  };
};

export default function WorkPage() {
  const [textarea, setTextarea] = useState("");
  const [data, setData] = useState({
    title: "",
    content: "",
    userName: "",
    updatedAt: "",
    userId: "",
    userLike: "",
  });
  const formatted = data.updatedAt
    ? format(new Date(data.updatedAt), "yy/MM/dd HH:mm")
    : "";

  const [comments, setComments] = useState<CommentType[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();

  const { id, listId } = params;

  const handleSubmit = async () => {
    CreateCommentApi({
      content: textarea,
      userId: data.userId,
      challengeworkId: `${listId}`,
    }).then((res) => {
      if (!res) return;
      setComments((prev) => [
        ...prev,
        {
          user: { nickname: res.user.nickname },
          content: res.content,
          updatedAt: format(new Date(res.updatedAt), "yy/MM/dd HH:mm"),
        },
      ]);
    });
  };

  // const handleClick = () => {
  //   setIsModalOpen(true)
  // }

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
          userName: res.user.nickname,
          updatedAt: res.updatedAt,
          userId: res.user.id,
          userLike: res.user.like,
        });
        setComments(
          res.challengework_feedback.map((item: Feedback) => ({
            user: { nickname: item.user.nickname },
            content: item.content,
            updatedAt: format(new Date(item.updatedAt), "yy/MM/dd HH:mm"),
          }))
        );
      })
      .catch((err) => console.error(err));
  }, [id, listId]);

  useEffect(() => {}, []);

  console.log("data", data);
  return (
    <div className={s.container}>
      <h2>{data.title}</h2>
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
            <p className={s.user}>{data.userName}</p>
          </div>
          <div className={s.like_box}>
            <Image
              src="/img/icon/line_heart.svg"
              alt="아이콘"
              width={16}
              height={16}
            />
            <span>{data.userLike}</span>
          </div>
        </div>
        <span>{formatted}</span>
      </div>
      <p>{data.content}</p>
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
            onClick={handleSubmit}
          />
        </div>
      </div>
      {comments.map((v, key) => (
        <Reply
          style={{ backgroundColor: "#f2f2f2", marginTop: "16px" }}
          key={key}
          userName={v.user.nickname}
          date={v.updatedAt}
          text={v.content}
          // onClick={handleClick}
        />
      ))}
    </div>
  );
}
