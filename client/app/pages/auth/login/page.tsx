"use client";

import Input from "@/app/shared/components/input/input";
import Btn from "@/app/shared/components/btn/btn";
import s from "./login.module.css";
import Link from "next/link";

export default function Login({}) {
  return (
    <div>
      <div className={s.inner}>
        <div className={s.logo_box}>
          <img src="/img/logo.svg" alt="Logo" style={{ width: "100%" }} />
        </div>
        <Input.Email />
        <Input.Password />
        <Btn.Solid.Large className={s.bt_l} width="100%">
          로그인
        </Btn.Solid.Large>
        <div className={s.join_box}>
          <span>회원이 아니신가요?</span>
          <Link href={"/pages/auth/singup"}>회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}
