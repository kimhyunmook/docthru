"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Pages() {
  const router = useRouter();
  useEffect(() => {
    router.push("/pages/challenge");
  }, []);
  return <div className="Pages"></div>;
}
