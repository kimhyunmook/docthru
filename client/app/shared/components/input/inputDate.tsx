import Input, { InputProps } from "./input";

function InputDate({
  label = "마감 기한",
  name,
  value,
  onChange,
  className,
}: InputProps) {
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

export default InputDate;
