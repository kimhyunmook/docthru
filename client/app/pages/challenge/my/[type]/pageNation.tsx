import s from "./styles/apply.module.css";
import Link from "next/link";

interface pageNation {
  previous: () => void;
  next: () => void;
  startNum: number;
  lastNum: number;
  page: number;
  pageSize: number;
  total: number;
  pageSet: React.Dispatch<React.SetStateAction<number>>;
}
export default function PageNation({
  previous,
  next,
  startNum,
  lastNum,
  page,
  pageSize,
  total,
  pageSet,
}: pageNation) {
  const arr = [];
  for (let i = startNum; i <= lastNum; i++) {
    if (i <= Math.ceil(total)) arr.push(i);
  }
  return (
    <div className={s.pageNavigation}>
      <button
        className={`${s.arrow} ${s.left} ${page === 1 && s.disable}`.trim()}
        onClick={previous}
      >{`<`}</button>
      <ul className={s.number}>
        {arr.map((v: number, i: number) => {
          return (
            <li key={`${v} ${i}`} className={page === v ? s.onPage : "navi"}>
              <Link
                href={`${v}`}
                onClick={(e) => {
                  e.preventDefault();
                  pageSet(Number(v));
                }}
              >
                {v}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className={`${s.arrow} ${s.right} ${
          page === total / pageSize && s.disable
        }`.trim()}
        onClick={next}
      >{`>`}</button>
    </div>
  );
}
