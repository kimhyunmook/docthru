"use client";
import s from "@/app/shared/styles/dropfilter.module.css";
import Image from "next/image";
import CloseBtn from "../btn/close";
import { PropsWithChildren } from "react";
import useValue from "../../hooks/useValue";
import Btn from "../btn/btn";

interface DropFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLElement>;
}
interface FilterState {
  name: string;
  checked: boolean;
  text: string;
}
const state1Init = [
  { name: "nextjs", checked: false, text: "Next.js" },
  {
    name: "modernjs",
    checked: false,
    text: "Modern JS",
  },
  {
    name: "api",
    checked: false,
    text: "API",
  },
  {
    name: "web",
    checked: false,
    text: "Web",
  },
  {
    name: "career",
    checked: false,
    text: "Career",
  },
];
const state2Init = [
  { name: "blog", checked: false, text: "블로그" },
  { name: "document", checked: false, text: "공식 문서" },
];
const state3Init = [
  { name: "inProgress", checked: false, text: "진행중" },
  { name: "finish", checked: false, text: "마감" },
];
export default function DropFilter({
  open,
  setOpen,
  onClick,
}: DropFilterProps) {
  const state1 = useValue(state1Init);
  const state2 = useValue(state2Init);
  const state3 = useValue(state3Init);
  const checkFilter = useValue(false);

  function reset() {
    state1.set((prev: FilterState[]) => {
      const reset = prev.map((v) => {
        v.checked = false;
        return v;
      });
      return reset;
    });
    state2.set((prev: FilterState[]) => {
      const reset = prev.map((v) => {
        v.checked = false;
        return v;
      });
      return reset;
    });
    state3.set((prev: FilterState[]) => {
      const reset = prev.map((v) => {
        v.checked = false;
        return v;
      });
      return reset;
    });
  }

  function filter() {
    const true1 = !!state1.value.filter((x: FilterState) => x.checked).length;
    const true2 = !!state2.value.filter((x: FilterState) => x.checked).length;
    const true3 = !!state3.value.filter((x: FilterState) => x.checked).length;
    if (true1 || true2 || true3) {
      checkFilter.set(true);
    } else checkFilter.set(false);
    setOpen(false);
  }
  return (
    <div
      className={`${s.dropdown} ${checkFilter.value ? s.filtering : ""}`.trim()}
    >
      <p className={`${s.label}`} onClick={onClick}>
        필터
        {checkFilter.value ? (
          <Image
            src={"/img/icon/filter_white.svg"}
            alt="필터"
            width={16}
            height={16}
          />
        ) : (
          <Image
            src={"/img/icon/filter.svg"}
            alt="필터"
            width={16}
            height={16}
          />
        )}
      </p>

      {open && (
        <div className={s.filterBox}>
          <div className={s.top}>
            <h2>필터</h2>
            <CloseBtn
              onClick={() => {
                setOpen(false);
                reset();
              }}
              width={20}
              height={20}
            />
          </div>
          <ListCover title="분야">
            {state1.value.map((v: FilterState, i: number) => {
              return (
                <Check
                  key={i}
                  name={v.name}
                  checked={v.checked}
                  setValue={state1.set}
                >
                  {v.text}
                </Check>
              );
            })}
          </ListCover>
          <ListCover title="문서 타입">
            {state2.value.map((v: FilterState, i: number) => {
              return (
                <Check
                  key={i}
                  name={v.name}
                  checked={v.checked}
                  setValue={state2.set}
                >
                  {v.text}
                </Check>
              );
            })}
          </ListCover>
          <ListCover title="상태">
            {state3.value.map((v: FilterState, i: number) => {
              return (
                <Check
                  key={i}
                  name={v.name}
                  checked={v.checked}
                  setValue={state3.set}
                >
                  {v.text}
                </Check>
              );
            })}
          </ListCover>
          <div className={s.btnArea}>
            <Btn.Outline.Medium onClick={reset}>초기화</Btn.Outline.Medium>
            <Btn.Solid.Medium onClick={filter}>적용</Btn.Solid.Medium>
          </div>
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
  checked: boolean;
  setValue: React.Dispatch<React.SetStateAction<FilterState[]>>;
}
function Check({ children, name, checked, setValue }: CheckProps) {
  // const checkedValue = useValue(checked);
  function clickHandle(e: React.MouseEvent<HTMLInputElement>) {
    const { name, checked } = e.currentTarget;
    setValue((prev) => {
      const find = prev.find((x) => x.name === name);
      if (find) {
        find.checked = checked;
      }
      return [...prev];
    });
  }

  return (
    <li className={s.list}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onClick={clickHandle}
        readOnly
        // onChange={checked.onChange}
      />
      <label htmlFor={name}>
        <span className={s.chk}>
          {checked && (
            <Image src="/img/icon/chk.svg" alt="체크" width={24} height={24} />
          )}
        </span>
        {children}
      </label>
    </li>
  );
}
