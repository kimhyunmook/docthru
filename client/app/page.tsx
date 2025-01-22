"use client";

import Link from "next/link";

export default function Home({}) {
  return (
    <div>
      <Link href={"/use"}>컴포넌트 활용법</Link>
    </div>
  );
}
