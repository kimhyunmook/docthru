"use client";
import { isValidEmail } from "@/lib/utils/convenience";
import Input, { InputProps } from "./input";
function InputEmail({ className, value, setValue, onChange }: InputProps) {
  const att = {
    label: "이메일",
    name: "email",
    type: "email",
    // value: email,
    error: "Email 형식이 아닙니다.",
    setValue,
    onChange,
    errorCondition: isValidEmail(value as string),
    placeholder: "Email을 입력해주세요",
    className,
  };
  return <Input {...att}></Input>;
}
InputEmail.displayName = "Input.Email";

export default InputEmail;
