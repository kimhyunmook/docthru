"use client";
import Gnb from "@/app/shared/components/gnb/gnb";
import { usePathname } from "next/navigation";

const noHeader = ["/", "/pages/auth/login", "/pages/auth/signup"];

export default function HeaderProvider({}) {
  const pathname = usePathname();
  const isValidHader = !noHeader.find((x) => x === pathname);
  return (
    <>
      {isValidHader && (
        <Gnb
          login={false}
          user={{ id: "0", name: "user", grade: "일반", heart: 0 }}
        />
      )}
    </>
  );
}
