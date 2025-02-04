import Input, { InputProps } from "./input";

function InputNumber({
  label,
  name,
  value,
  className,
  setValue,
  onChange,
  placeholder,
}: InputProps) {
  const onlyNumber = /[^0-9]/g;

  function changeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    console.log(value);
    if (setValue) {
      setValue(value);
    }
  }

  const inputAtt = {
    label,
    id: name,
    name,
    value,
    setValue,
    className,
    onChange: changeHandle,
    placeholder,
  };

  if (!!onChange) throw new Error("onChange 대신 setValue를 사용해주세요.");

  return (
    <Input
      type={"text"}
      onInput={(e) => {
        const { value } = e.currentTarget;
        if (onlyNumber.test(value)) alert("숫자만 입력해주세요");
        e.currentTarget.value = value.replace(onlyNumber, "");
      }}
      {...inputAtt}
    ></Input>
  );
}

InputNumber.displayName = "Input.Number";
export default InputNumber;
