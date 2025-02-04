import Input, { InputProps } from "./input";

function InputDate({
  label = "마감 기한",
  name,
  value,
  onChange,
  className,
  onInput,
}: InputProps) {
  const inputAtt = {
    label,
    id: name,
    name,
    value,
    onChange,
    className,
    onInput,
  };
  return <Input type={"date"} {...inputAtt}></Input>;
}

InputDate.displayName = "Input.Date";
export default InputDate;
