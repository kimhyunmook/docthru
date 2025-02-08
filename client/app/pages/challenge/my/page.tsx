"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyChallenge() {
  const router = useRouter();

  useEffect(() => {
    router.push("/pages/challenge/my/participating");
  }, []);
  return <div className={"x"}></div>;
}
