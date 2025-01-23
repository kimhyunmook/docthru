"use client";

import Link from "next/link";
import Logo from "./shared/components/logo";
import s from "./page.module.css";

export default function Home({}) {
  return (
    <div className={s.page}>
      <div className={s.center}></div>
      <Logo width={363} height={82} href="#" />
      <Link href={"/use"}>컴포넌트 활용법</Link>
    </div>
  );
}
