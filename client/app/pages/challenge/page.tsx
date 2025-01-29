"use client";
import Btn from "@/app/shared/components/btn/btn";
import s from "./challenge.module.css";
import Dropdown from "@/app/shared/components/dropdown/dropdown";
import SearchInput from "@/app/shared/components/search";
import Card from "@/app/shared/components/card/card";
import Chip from "@/app/shared/components/chip/chip";

export default function Challenge() {
  const arr = [1, 23, 4, 5, 6, 7, 8, 9];
  return (
    <div className={s.challenge}>
      <div className={s.top}>
        <h2>챌린지 목록</h2>
        <Btn.Solid size="l" className={s.btn}>
          신규 챌린지 신청 +
        </Btn.Solid>
      </div>
      <div>
        <div className={s.search_box}>
          <Dropdown.Sort className={s.filter}>필터</Dropdown.Sort>
          <SearchInput className={s.search}></SearchInput>
        </div>
        <ul>
          {arr.map((v) => {
            return (
              <li key={v}>
                <Card
                  chip={<Chip.NextChip />}
                  categori={<Chip.Categori>블로그</Chip.Categori>}
                  state={<Chip.Card.Compolete />}
                  className={``}
                  date="0000년 00월 00일"
                  current={3}
                  total={3}
                ></Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
