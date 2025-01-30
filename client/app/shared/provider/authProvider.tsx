import {
  loginApi,
  LoginProps,
  logoutApi,
  refreshTokenApi,
} from "@/app/api/auth/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import useValue from "../hooks/useValue";
import { getUserAPi } from "@/app/api/user/api";
import type { User } from "../types/user";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextType {
  login: ({ email, password }: LoginProps) => Promise<void>;
  refreshToken: () => Promise<void>;
  logout: () => Promise<void>;
  user: User;
  isPending: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const expired = 60 * 60 * 1000;

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const storage = useLocalStorage();
  const token = useValue(null);
  const {
    data: user,
    isStale,
    isPending,
    isLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user", !!token.value],
    queryFn: getUserAPi,
    enabled: !!token.value,
    staleTime: expired, // 한 시간
  });

  useEffect(() => {
    token.set(storage.get("token"));
    if (isStale && !isPending) {
      console.log("isStale", isStale);
      refreshToken();
      userRefetch();
    }
  }, [isStale, token.value]);
  async function login({ email, password }: LoginProps) {
    const res = await loginApi({ email, password });
    if (!res.success) {
      alert("로그인 실패");
      return;
    }
    token.set(storage.set("token", res.accessToken, expired));
    await userRefetch();
    router.push("/pages");
  }

  async function refreshToken() {
    const res = await refreshTokenApi();
    if (!res.success) {
      console.log("refresh 실패");
      return;
    }
    token.set(storage.set("token", res.accessToken, expired));
    userRefetch();
  }

  async function logout() {
    const res = await logoutApi();
    if (!res.success) {
      console.log("refresh 실패");
    }
    localStorage.removeItem("token");
    token.set(false);
    alert("로그아웃 되었습니다.");
    await userRefetch();
    router.refresh();
  }

  if (isLoading) return "loading...";
  if (isPending) return null;

  return (
    <AuthContext.Provider
      value={{ login, refreshToken, logout, isPending, user: user?.data }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider 내부에서 사용해주세요.");
  return context;
}
