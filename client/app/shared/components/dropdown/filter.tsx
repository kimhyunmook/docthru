"use client";
import s from "@/app/shared/styles/dropfilter.module.css";
import Image from "next/image";
import CloseBtn from "../btn/close";
import { PropsWithChildren } from "react";
import useValue from "../../hooks/useValue";

interface DropFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLElement>;
}
export default function DropFilter({
  open,
  setOpen,
  onClick,
}: DropFilterProps) {
  return (
    <div className={s.dropdown}>
      <p className={`${s.label}`} onClick={onClick}>
        필터
        <Image src={"/img/icon/filter.svg"} alt="필터" width={16} height={16} />
      </p>

      {open && (
        <div className={s.filterBox}>
          <div className={s.top}>
            <h2>필터</h2>
            <CloseBtn
              onClick={() => {
                setOpen(false);
              }}
              width={20}
              height={20}
            />
          </div>
          <ListCover title="분야">
            <Check name="nextjs">Next.js</Check>
            <Check name="modernjs">Modern JS</Check>
            <Check name="api">API</Check>
            <Check name="Web">Web</Check>
            <Check name="Career">Career</Check>
          </ListCover>
          <ListCover title="문서 타입">
            <Radio name="documentType" id="blog">
              블로그
            </Radio>
            <Radio name="documentType" id="document">
              공식 문서
            </Radio>
          </ListCover>
          <ListCover title="상태"></ListCover>
        </div>
      )}
    </div>
  );
}
interface ListCoverProps extends PropsWithChildren {
  title: string;
}
function ListCover({ children, title }: ListCoverProps) {
  return (
    <ul className={s.listCover}>
      <li className={s.title}>
        <h3>{title}</h3>
      </li>
      {children}
    </ul>
  );
}

interface CheckProps extends PropsWithChildren {
  name: string;
}
function Check({ children, name }: CheckProps) {
  const checked = useValue(false);
  function clickHandle(e: React.MouseEvent<HTMLInputElement>) {
    checked.set(e.currentTarget.checked);
  }
  function imgClickHandle() {
    checked.set((prev: boolean) => !prev);
  }
  return (
    <li className={s.list}>
      <div className={s.chk} onClick={imgClickHandle}>
        {checked.value && (
          <Image src="/img/icon/chk.svg" alt="체크" width={24} height={24} />
        )}
      </div>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked.value}
        onClick={clickHandle}
        readOnly
        // onChange={checked.onChange}
      />
      <label htmlFor={name}>{children}</label>
    </li>
  );
}

interface RadioProps extends PropsWithChildren {
  name: string;
  id: string;
  checked?: boolean;
}
function Radio({ children, name, id, checked }: RadioProps) {
  const radio = useValue(checked ? checked : false);
  function eventHandle(
    e: React.MouseEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) {
    const inputs = [
      ...document.querySelectorAll(`.${name}`),
    ] as HTMLInputElement[];
    inputs.forEach((v) => {
      //   console.log(v, v === e.currentTarget);
      if (v === e.currentTarget) radio.set(e.currentTarget.checked);
      else radio.set(false);
    });
  }
  function radioClickHandle(e: React.MouseEvent<HTMLElement>) {
    const t = document.querySelectorAll(`.${s.on}`);
    console.log(t);
    // if(e.currentTarget)
    radio.set((prev: boolean) => !prev);
  }
  return (
    <li className={s.list}>
      <div
        className={`${s.radio} ${radio.value && s.on}`.trim()}
        onClick={radioClickHandle}
      ></div>
      <input
        type="radio"
        id={id}
        name={name}
        className={name}
        onClick={eventHandle}
        onChange={eventHandle}
        checked={radio.value}
      />
      <label htmlFor={id}>{children}</label>
    </li>
  );
}
