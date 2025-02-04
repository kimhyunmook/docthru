"use client";
import Logo from "./shared/components/logo";
import s from "./page.module.css";

export default function Home({}) {
  return (
    <div className={s.page}>
      <Logo
        className={s.logo}
        width={500}
        height={150}
        href="/pages/challenge"
      />
    </div>
  );
}
