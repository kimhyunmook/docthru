import {
  loginApi,
  LoginProps,
  logoutApi,
  refreshTokenApi,
} from "@/app/api/auth/api";
import { finishUpdateApi } from "@/app/api/challenge/api";
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
import { useToaster } from "./toasterProvider";

interface AuthContextType {
  login: ({ email, password }: LoginProps) => Promise<void>;
  refreshToken: () => Promise<void>;
  logout: () => Promise<void>;
  user: User;
  auth: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const expired = 60 * 60 * 1000 * 24;

export function AuthProvider({ children }: PropsWithChildren) {
  const toast = useToaster();
  const router = useRouter();
  const storage = useLocalStorage();
  const queryClient = useQueryClient();
  const [token, setToken] = useState(storage.get("token"));
  const {
    data: user,
    isStale,
    isFetching,
    isLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: getUserAPi,
    enabled: !!token,
    staleTime: expired, // 한 시간
    refetchInterval: 60 * 1000 * 60,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setToken(storage.get("token"));
    if (isLoading) return;
    if (token) finishUpdateApi();
    if (isStale) refreshToken();
  }, [isStale, token, isLoading]);

  async function login({ email, password }: LoginProps) {
    const res = await loginApi({ email, password });
    if (!res.success) {
      toast("warn", "id 또는 password를 확인해주세요");
      // alert("id 또는 password 를 확인해주세요");
      return;
    }
    toast("info", "로그인 되었습니다.");
    router.push("/pages");
    storage.set("token", res.accessToken, expired);
    setToken(res.accessToken);
    userRefetch();
  }

  async function refreshToken() {
    if (!!token) return;
    const res = await refreshTokenApi();
    if (!res.success) {
      console.log("refresh 실패");
      return;
    }
    storage.set("token", res.accessToken, expired);
    setToken(res.accessToken);
    userRefetch();
  }

  async function logout() {
    await logoutApi();
    toast("info", "로그아웃 되었습니다.");
    userRefetch();
    localStorage.clear();
    queryClient.removeQueries({ queryKey: ["user"] });
    router.refresh();
    setToken(null);
  }
  function auth() {
    if (!isLoading && !!!user) {
      toast("warn", "로그인 해주세요");
      router.replace("/pages/auth/login");
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, refreshToken, isLoading, isFetching, logout, user, auth }}
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
