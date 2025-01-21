"use client";
import styles from "@/app/shared/styles/search.module.css";
import Image from "next/image";
import { useState } from "react";

type SearchInputT = {
  className: string;
  setData: any;
};
function SearchInput({ setData, className }: SearchInputT) {
  const [value, setValue] = useState("");
  function searchHandle(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue(e.target.value);
  }
  return (
    <div className={`${styles.search} ${className}`}>
      <Image src="/img/icon/search.svg" alt="검색" width={24} height={24} />
      <input
        type="text"
        onChange={searchHandle}
        defaultValue={value}
        placeholder="챌린지 이름을 검색해보세요"
      />
    </div>
  );
}

export default SearchInput;
