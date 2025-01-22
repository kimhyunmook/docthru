"use client";
import styles from "@/app/shared/styles/input.module.css";
import { InputHTMLAttributes, useEffect, useState } from "react";

import LinkImg from "./LinkImg";
import { PropsWithClassName } from "../types/common";

type InputT = {
  label: string;
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  id?: string;
  className?: string;
  error?: string;
  errorCondition?: boolean;
};
type InputType = PropsWithClassName & InputT;

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "없음",
  className,
  error,
  errorCondition = false,
  children,
  ...props
}: InputType) {
  const [isErr, setIsErr] = useState(errorCondition);
  const inputAtt = {
    id: name,
    name,
    type,
    value,
    onChange,
    placeholder,
  };
  useEffect(() => {
    setIsErr(!errorCondition);
  }, [value, errorCondition]);

  return (
    <div className={`${styles.inputBox} ${className}`}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.input}>
        <input {...inputAtt} {...props} />
        {children}
      </div>
      {isErr && !!value && <p className={styles.error}>{error}</p>}
    </div>
  );
}

function Password({
  label = "비밀번호",
  name,
  value,
  onChange,
  placeholder,
  className,
}: InputType) {
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState({
    width: 24,
    height: 24,
    onClick: passwordIconHandle,
    src: "/img/icon/view_off.svg",
    alt: "off",
    href: "#",
  });

  function passwordIconHandle(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const { src } = e.target as HTMLImageElement;
    if (src.includes("off")) {
      setIcon({
        ...icon,
        src: "/img/icon/view.svg",
      });
      setInputType("text");
    } else {
      setIcon({
        ...icon,
        src: "/img/icon/view_off.svg",
      });
      setInputType("password");
    }
  }
  const inputAtt: InputType = {
    label,
    id: name,
    name,
    value,
    onChange,
    placeholder,
    className,
    type: inputType,
  };
  return (
    <Input {...inputAtt}>
      <LinkImg {...icon} />
    </Input>
  );
}

function Date({
  label = "마감 기한",
  name,
  value,
  onChange,
  className,
}: InputType) {
  const inputAtt = {
    label,
    id: name,
    name,
    value,
    onChange,
    className,
  };
  return <Input type={"date"} {...inputAtt}></Input>;
}

Input.Password = Password;
Input.Date = Date;

export default Input;
