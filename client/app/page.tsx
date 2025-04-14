"use client";
import Logo from "./shared/components/logo";
import s from "./page.module.css";
import { useEffect } from "react";

export default function Home({}) {
  useEffect(() => {}, []);
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
