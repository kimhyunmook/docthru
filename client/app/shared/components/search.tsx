"use client";
import styles from "@/app/shared/styles/search.module.css";
import Image from "next/image";

type SearchInputProps = {
  value: string;
  className?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onClick: React.MouseEventHandler<HTMLElement>;
};
function SearchInput({
  value,
  setValue,
  className,
  onClick,
}: SearchInputProps) {
  function searchHandle(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue(e.target.value);
  }
  return (
    <div className={`${styles.search} ${className}`}>
      <Image
        src="/img/icon/search.svg"
        alt="검색"
        width={24}
        height={24}
        onClick={onClick}
      />
      <input
        type="text"
        onChange={searchHandle}
        value={value}
        placeholder="챌린지 이름을 검색해보세요"
      />
    </div>
  );
}

export default SearchInput;
