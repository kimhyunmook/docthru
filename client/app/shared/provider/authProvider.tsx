"use client";
import {
  loginApi,
  LoginProps,
  logoutApi,
  refreshTokenApi,
} from "@/app/api/auth/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserAPi } from "@/app/api/user/api";
import type { User } from "../types/user";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextType {
  login: ({ email, password }: LoginProps) => Promise<void>;
  refreshToken: () => Promise<void>;
  logout: () => Promise<void>;
  user: User;
  isFetching: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const expired = 60 * 60 * 1000;

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const storage = useLocalStorage();
  const queryClient = useQueryClient();
  const [token, setToken] = useState(storage.get("token"));
  const {
    data: user,
    isStale,
    isPending,
    isFetching,
    isLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: getUserAPi,
    enabled: !!token,
    staleTime: 5000, // 한 시간
  });

  useEffect(() => {
    setToken(storage.get("token"));
    // console.log(isPending);
    if (isStale && !isPending) {
      console.log("isStale", isStale);
      // refreshToken();
    }
  }, [isStale, token]);

  // if (isFetching) return null;

  async function login({ email, password }: LoginProps) {
    const res = await loginApi({ email, password });
    router.push("/pages");
    storage.set("token", res.accessToken, expired);
    setToken(res.accessToken);
    userRefetch();
  }

  async function refreshToken() {
    const res = await refreshTokenApi();
    console.log("refresh", res);
    if (!res.success) {
      console.log("refresh 실패");
      return;
    }
    setToken(res.accessToken);
    userRefetch();
  }

  async function logout() {
    await logoutApi();
    // alert("로그아웃 되었습니다.");
    userRefetch();
    localStorage.clear();
    queryClient.removeQueries({ queryKey: ["user"] });
    router.refresh();
    setToken(null);
  }

  if (isLoading) return "loading...";
  // if (isFetching) return null;

  return (
    <AuthContext.Provider
      value={{ login, refreshToken, isFetching, logout, user }}
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
