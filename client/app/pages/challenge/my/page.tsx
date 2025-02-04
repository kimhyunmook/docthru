"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/shared/provider/authProvider";

export default function MyChallenge() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!!!user) router.push("/");
    else router.push("/pages/challenge/my/participating");
  }, []);
  return <div className={"x"}></div>;
}
