"use client";
import s from "@/app/shared/styles/dropfilter.module.css";
import Image from "next/image";
import CloseBtn from "../btn/close";
import { PropsWithChildren } from "react";
import useValue from "../../hooks/useValue";
import Btn from "../btn/btn";
import {
  ChallengeFilterProps,
  DocumentType,
  FieldType,
  StateType,
} from "../../types/common";
import { useRouter } from "next/navigation";

interface DropFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLElement>;
  setFilter: React.Dispatch<React.SetStateAction<ChallengeFilterProps>>;
}

export default function DropFilter({
  open,
  setOpen,
  onClick,
  setFilter,
}: DropFilterProps) {
  const field = useValue(state1Init);
  const documentType = useValue(state2Init);
  const state = useValue(state3Init);
  const checkFilter = useValue(false);

  function reset() {
    field.set((prev: FieldProps[]) => {
      const reset = prev.map((v) => {
        v.checked = false;
        return v;
      });
      return reset;
    });
    documentType.set((prev: DocumentProps[]) => {
      const reset = prev.map((v) => {
        v.checked = false;
        return v;
      });
      return reset;
    });
    state.set((prev: FilterState[]) => {
      const reset = prev.map((v) => {
        v.checked = false;
        return v;
      });

      return reset;
    });
    setFilter({
      field: [],
      documentType: [],
      state: [],
    });
    setOpen(false);
  }

  function filter() {
    const fieldText = field.value.filter((x) => x.checked).map((v) => v.text);
    const documentTypeText = documentType.value
      .filter((x: FilterState) => x.checked)
      .map((v) => v.text);
    const stateText = state.value
      .filter((x: FilterState) => x.checked)
      .map((v) => v.name);

    if (!!fieldText.length || !!documentTypeText.length || !!stateText.length) {
      checkFilter.set(true);
    } else checkFilter.set(false);
    setOpen(false);

    setFilter({
      field: fieldText,
      documentType: documentTypeText,
      state: stateText,
    });
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
            {field.value.map((v: FieldProps, i: number) => {
              return (
                <Check
                  key={i}
                  name={v.name}
                  checked={v.checked}
                  setValue={field.set}
                >
                  {v.text}
                </Check>
              );
            })}
          </ListCover>
          <ListCover title="문서 타입">
            {documentType.value.map((v: FilterState, i: number) => {
              return (
                <Check
                  key={i}
                  name={v.name}
                  checked={v.checked}
                  setValue={documentType.set}
                >
                  {v.text}
                </Check>
              );
            })}
          </ListCover>
          <ListCover title="상태">
            {state.value.map((v: FilterState, i: number) => {
              return (
                <Check
                  key={i}
                  name={v.name}
                  checked={v.checked}
                  setValue={state.set}
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
  setValue: React.Dispatch<React.SetStateAction<any[]>>;
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

interface FilterState {
  name: string;
  checked: boolean;
  text: string;
}
interface FieldProps extends Omit<FilterState, "text"> {
  text: FieldType;
}
interface DocumentProps extends Omit<FilterState, "text"> {
  text: DocumentType;
}
interface StateProps extends Omit<FilterState, "text"> {
  text: StateType;
}
const state1Init: FieldProps[] = [
  { name: "Next.js", checked: false, text: "Next.js" },
  {
    name: "Modern JS",
    checked: false,
    text: "Modern JS",
  },
  {
    name: "API",
    checked: false,
    text: "API",
  },
  {
    name: "Web",
    checked: false,
    text: "Web",
  },
  {
    name: "Career",
    checked: false,
    text: "Career",
  },
];
const state2Init: DocumentProps[] = [
  { name: "blog", checked: false, text: "블로그" },
  { name: "document", checked: false, text: "공식문서" },
];
const state3Init = [
  { name: "inProgress", checked: false, text: "진행중" },
  { name: "finish", checked: false, text: "마감" },
];
