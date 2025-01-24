"use client";
import Crystal, { CrystalLayout } from "../use/crystal/crystal";
import Input from "../shared/components/input/input";
import { useState } from "react";

export default function Text() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  return (
    <Crystal>
      <CrystalLayout title="test">
        <Input
          label="테스터"
          name="test"
          type="text"
          value={email}
          onChange={(e) => {
            const { value } = e.target;
            setEmail(value);
          }}
          error={"이메일 형식 아니야"}
          errorCondition={false}
        />
        <Input.Email className="" />
        <Input.Password
          label="비밀번호"
          name=""
          value=""
          onChange={() => {}}
          placeholder=""
          className=""
        />
        <Input.Date
          label="마감기한"
          name=""
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className=""
        />
      </CrystalLayout>
    </Crystal>
  );
}
