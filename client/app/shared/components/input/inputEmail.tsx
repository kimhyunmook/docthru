import { isValidEmail } from "@/lib/utils/convenience";
import Input, { InputProps } from "./input";
import { useState } from "react";
import { PropsWithClassName } from "../../types/common";

function InputEmail({ className, onChange }: InputProps) {
  const att = {
    label: "이메일",
    name: "email",
    type: "email",
    // value: email,
    error: "Email 형식이 아닙니다.",
    onChange,
    // errorCondition: isValidEmail(email),
    placeholder: "Email을 입력해주세요",
    className,
  };
  return <Input {...att}></Input>;
}
InputEmail.displayName = "Input.Email";

export default InputEmail;
