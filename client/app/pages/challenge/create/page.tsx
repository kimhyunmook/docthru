"use client";

import Input from "@/app/shared/components/input/input";
import s from "./application.module.css";
import { PropsWithChildren, useEffect, useState } from "react";
import Btn from "@/app/shared/components/btn/btn";
import { PostChallenge } from "@/app/service/challenge/api";
import { isValidURL } from "@/lib/utils/convenience";
import { useRouter } from "next/navigation";
import Dropdown from "@/app/shared/components/dropdown/dropdown";
import useValue from "@/app/shared/hooks/useValue";
import { DocumentType } from "@/app/shared/types/common";
import { useToaster } from "@/app/shared/provider/toasterProvider";
import { useAuth } from "@/app/shared/provider/authProvider";

interface bodyProps extends PropsWithChildren {
  mainTitle: string;
  changeHandle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  clickHanlde?: (e?: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
}

export interface Form {
  title: string;
  originalLink: string;
  content: string;
}

export default function Application({
  mainTitle,
  children,
  changeHandle,
  clickHanlde,
}: bodyProps) {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    title: "",
    originalLink: "",
    content: "",
  });
  const date = useValue("");
  const maximum = useValue("");
  const field = useValue("");
  const documentType = useValue("블로그");
  const toast = useToaster();
  const { auth, user } = useAuth();

  useEffect(() => {
    auth();
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    const { value, name } = e.target;
    if (!!changeHandle) changeHandle(e);
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleClick() {
    if (allErrorCondtion.find((x) => !x) === false)
      return toast("warn", "모든 정보를 기입해주세요");
    if (!!clickHanlde) clickHanlde();
    else {
      PostChallenge({
        ...form,
        date: date.value,
        maximum: maximum.value,
        documentType: documentType.value as DocumentType,
        field: field.value,
      }).then((res) => {
        if (res.success) {
          toast("info", "챌린지 생성에 성공했습니다.");
          router.push("/pages/challenge");
          return;
        }
        toast("warn", "챌린지 성공에 실패했습니다.");
        router.refresh();
      });
    }
  }

  const allErrorCondtion = [
    form.title.length >= 5,
    isValidURL(form.originalLink),
  ];

  return (
    <div className={s.application}>
      <h2>{mainTitle ? mainTitle : "신규 챌린지 신청"}</h2>
      <Input
        label="제목"
        name="title"
        value={form.title}
        placeholder="제목을 입력해주세요"
        onChange={handleChange}
        error="5글자 이상 적어주세요"
        errorCondition={allErrorCondtion[0]}
      />
      <Input
        label="원문 링크"
        name="originalLink"
        value={form.originalLink}
        placeholder="원문 링크를 입력해주세요"
        onChange={handleChange}
        error="URL을 정확히 입력해주세요"
        errorCondition={allErrorCondtion[1]}
      />
      <Selector
        label="분야"
        name="field"
        value={field.value}
        setValue={field.set}
      />
      <Selector
        label="문서 타입"
        name="documentType"
        value={documentType.value}
        setValue={documentType.set}
        list={["블로그", "공식문서"]}
      />
      <Input.Date
        name="date"
        value={date.value}
        onInput={(e) => {
          const now = new Date();
          const { value } = e.currentTarget;
          const targetDate = new Date(value);
          if (targetDate < now) return alert("마감 기한은 최소 +1일 입니다.");
          date.set(value);
        }}
      />
      <Input.Number
        label="최대 인원"
        name="maximum"
        value={maximum.value}
        setValue={maximum.set}
        placeholder="인원을 입력해주세요"
      />
      <div className={s.constent_box}>
        <span>내용</span>
        <textarea
          name="content"
          className={s.textarea}
          placeholder="내용을 입력해주세요"
          value={form.content}
          onChange={handleChange}
        />
      </div>
      {!!children ? (
        children
      ) : (
        <Btn.Solid.Large onClick={handleClick} className={s.bt_l}>
          신청하기
        </Btn.Solid.Large>
      )}
    </div>
  );
}

interface SelectorProps {
  label: string;
  name: string;
  list?: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
function Selector({
  label,
  name,
  list,
  value,
  onChange,
  setValue,
}: SelectorProps) {
  return (
    <div className={s.dropdownBox}>
      <label htmlFor={name}>{label}</label>
      <Dropdown
        name={name}
        list={list}
        value={value}
        onChange={onChange}
        setValue={setValue}
        className={s.dropdown}
      ></Dropdown>
    </div>
  );
}
