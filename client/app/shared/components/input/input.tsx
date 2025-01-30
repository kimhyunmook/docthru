"use client";
import styles from "@/app/shared/styles/input.module.css";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { PropsWithClassName } from "../../types/common";
import InputDate from "./inputDate";
import InputPassword from "./inputPassword";
import InputEmail from "./inputEmail";

export type InputProps = PropsWithClassName &
  InputHTMLAttributes<HTMLInputElement> & {
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    label?: string;
    error?: string;
    errorCondition?: boolean;
  };

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  className,
  error,
  errorCondition = false,
  children,
  setValue,
  ...props
}: InputProps) {
  const [isErr, setIsErr] = useState(errorCondition);
  const inputAtt = {
    id: name,
    name,
    type,
    value,
    onChange,
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
Input.displayName = "Input";
Input.Email = InputEmail;
Input.Password = InputPassword;
Input.Date = InputDate;

export default Input;
