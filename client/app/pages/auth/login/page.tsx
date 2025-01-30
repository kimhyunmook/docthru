"use client";

import Input from "@/app/shared/components/input/input";
import Btn from "@/app/shared/components/btn/btn";
import s from "./login.module.css";
import Link from "next/link";
import useValue from "@/app/shared/hooks/useValue";
import { loginApi } from "@/app/api/auth/api";
import { useAuth } from "@/app/shared/provider/authProvider";

export default function Login({}) {
  const email = useValue("");
  const password = useValue("");
  const { login } = useAuth();

  return (
    <div>
      <div className={s.inner}>
        <div className={s.logo_box}>
          <img src="/img/logo.svg" alt="Logo" style={{ width: "100%" }} />
        </div>
        <Input.Email value={email.value} onChange={email.onChange} />
        <Input.Password value={password.value} onChange={password.onChange} />
        <Btn.Solid.Large
          className={s.bt_l}
          width="100%"
          onClick={() =>
            login({ email: email.value, password: password.value })
          }
        >
          로그인
        </Btn.Solid.Large>
        <div className={s.join_box}>
          <span>회원이 아니신가요?</span>
          <Link href={"/pages/auth/signup"}>회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}
