"use client";
import { useEffect } from "react";
import s from "./my.module.css";
import { useRouter } from "next/navigation";

export default function MyChallenge() {
  const router = useRouter();
  useEffect(() => {
    router.push("/pages/challenge/my/participating");
  }, []);
  return <div className={s.container}></div>;
}
