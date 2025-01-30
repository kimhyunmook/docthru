"use client";

import Btn from "@/app/shared/components/btn/btn";
import Application from "../create/page";
import s from "../create/application.module.css";
import { useEffect, useState } from "react";
import { PatchCallenge } from "@/app/api/challenge/api";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    originalLink: "",
    field: "",
    date: "",
    maximum: "",
    content: "",
  });

  //   useEffect(() => {
  //     console.log(form);
  //   }, [form]);

  function handleClick() {
    console.log(form);
    PatchCallenge(form);
  }
  return (
    <Application mainTitle="챌린지 수정" setData={setForm}>
      <Btn.Solid.Large onClick={handleClick} className={s.bt_l} width="100%">
        수정하기
      </Btn.Solid.Large>
    </Application>
  );
}
