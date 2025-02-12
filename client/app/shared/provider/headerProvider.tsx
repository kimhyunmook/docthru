"use client";
import Gnb from "@/app/shared/components/gnb/gnb";
import { usePathname } from "next/navigation";
import { useAuth } from "./authProvider";
import exp from "constants";

const noHeader = [
  "/",
  "/pages/auth/login",
  "/pages/auth/signup",
  "/pages/challenge/work/create",
];

export function HeaderProvider({}) {
  const pathname = usePathname();
  const isValidHader = !noHeader.find((x) => x === pathname);
  const { user } = useAuth();
  return <>{isValidHader && <Gnb user={user} />}</>;
}
