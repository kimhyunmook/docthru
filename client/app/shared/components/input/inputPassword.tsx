import Input, { InputProps } from "./input";
import LinkImg from "../LinkImg";
import { useState } from "react";

function InputPassword({
  label = "비밀번호",
  name,
  value,
  onChange,
  placeholder,
  className,
}: InputProps) {
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
  const inputAtt: InputProps = {
    label,
    id: name,
    name,
    value,
    onChange,
    placeholder: placeholder ? placeholder : "비밀번호를 입력해주세요",
    className,
    type: inputType,
  };
  return (
    <Input {...inputAtt}>
      <LinkImg {...icon} />
    </Input>
  );
}

export default InputPassword;
