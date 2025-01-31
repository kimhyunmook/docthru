import Input, { InputProps } from "./input";

function InputNumber({ label, name, value, onChange, className }: InputProps) {
  const inputAtt = {
    label,
    id: name,
    name,
    value,
    onChange,
    className,
  };

//   function changeHandle() {}
  return <Input type={"date"} {...inputAtt}></Input>;
}

InputNumber.displayName = "Input.Number";
export default InputNumber;
