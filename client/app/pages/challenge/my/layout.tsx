"use client";
import { useAuth } from "@/app/shared/provider/authProvider";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { auth, user } = useAuth();
  useEffect(() => {
    auth();
  }, [user]);
  return <>{children}</>;
}
