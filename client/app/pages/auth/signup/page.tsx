"use client";

import s from "@/app/pages/auth/login/login.module.css";

import Input from "@/app/shared/components/input/input";
import Btn from "@/app/shared/components/btn/btn";
import Link from "next/link";
import { signupApi } from "@/app/api/auth/api";
import { useEffect, useState } from "react";

export default function Sign({}) {
  const [body, setBody] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  const [check, setCheck] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleClick() {
    console.log(body);
    if (body.password !== check) {
      console.log("비밀번호 다름");
      return;
    }
    signupApi(body);
  }

  return (
    <div>
      <div className={s.inner}>
        <div className={s.logo_box}>
          <img src="/img/logo.svg" alt="Logo" style={{ width: "100%" }} />
        </div>
        <Input.Email onChange={handleChange} />
        <Input
          label="닉네임"
          onChange={handleChange}
          name="nickname"
          placeholder="닉네임을 입력해주세요"
        />
        <Input.Password name="password" onChange={handleChange} />
        <Input.Password
          label="비밀번호 확인"
          name="password2"
          onChange={(e) => {
            setCheck(e.target.value);
          }}
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
        <Btn.Solid.Large onClick={handleClick} className={s.bt_l} width="100%">
          회원가입
        </Btn.Solid.Large>
        <div className={s.join_box}>
          <span>회원이신가요?</span>
          <Link href={"/pages/auth/login"}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}
