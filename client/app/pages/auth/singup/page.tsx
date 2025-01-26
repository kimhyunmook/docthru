"use client";

import s from "@/app/pages/auth/login/login.module.css";

import Input from "@/app/shared/components/input/input";
import Btn from "@/app/shared/components/btn/btn";
import Link from "next/link";

export default function Login({}) {
  return (
    <div>
      <div className={s.inner}>
        <div className={s.logo_box}>
          <img src="/img/logo.svg" alt="Logo" style={{ width: "100%" }} />
        </div>
        <Input.Email />
        <Input
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
        />
        <Input.Password />
        <Input.Password
          label="비밀번호 확인"
          name="password2"
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
        <Btn.Solid.Large className={s.bt_l} width="100%">
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
