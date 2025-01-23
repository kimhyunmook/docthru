import { isValidEmail } from "@/lib/utils/convenience";
import Input from "./input";
import { useState } from "react";

function InputEmail({}) {
  const [email, setEmail] = useState("");

  const att = {
    label: "이메일",
    name: "email",
    type: "email",
    value: email,
    error: "Email 형식이 아닙니다.",
    errorCondition: isValidEmail(email),
    placeholder: "Email을 입력해주세요",
  };
  return (
    <Input
      {...att}
      onChange={(e) => {
        e.preventDefault();
        const { value } = e.target;
        setEmail(value);
      }}
    ></Input>
  );
}

export default InputEmail;
