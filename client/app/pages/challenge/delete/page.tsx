"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeletePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/pages/challenge");
  }, []);

  return <></>;
}
