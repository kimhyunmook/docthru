"use client";
import s from "@/app/pages/auth/login/login.module.css";
import Input from "@/app/shared/components/input/input";
import Btn from "@/app/shared/components/btn/btn";
import Link from "next/link";
import { signupApi } from "@/app/service/auth/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LinkImg from "@/app/shared/components/LinkImg";
import { useToaster } from "@/app/shared/provider/toasterProvider";

export default function Sign({}) {
  const router = useRouter();
  const [body, setBody] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  const [check, setCheck] = useState("");
  const toaster = useToaster();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleClick() {
    if (body.password !== check) {
      toaster("warn", "비밀 번호를 확인해주세요");
      return;
    }
    const result = await signupApi(body);
    if (!result.success) {
      toaster("warn", "정보를 정확히 입력해주세요.");
      return;
    }
    // alert("회원가입을 축하합니다.");
    toaster("info", "회원가입을 축하합니다.");
    router.replace("/pages/auth/login");
  }

  return (
    <div>
      <div className={s.inner}>
        <div className={s.logo_box}>
          <LinkImg
            href="/"
            src="/img/logo.svg"
            alt="Logo"
            width={320}
            height={82}
          />
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
        <Btn.Solid.Large
          enter={true}
          onClick={handleClick}
          className={s.bt_l}
          width="100%"
        >
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
