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
  isLoading: boolean;
  isFetching: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const expired = 60 * 60 * 1000 * 24;

interface AuthProvider extends PropsWithChildren {}

export function AuthProvider({ children }: AuthProvider) {
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
    console.log("isStale ture됨", isStale);
    refreshToken();
  }, [isStale, token]);

  async function login({ email, password }: LoginProps) {
    const res = await loginApi({ email, password });
    if (!res.success) {
      alert("id 또는 password 를 확인해주세요");
      return;
    }
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
    alert("로그아웃 되었습니다.");
    userRefetch();
    localStorage.clear();
    queryClient.removeQueries({ queryKey: ["user"] });
    router.refresh();
    setToken(null);
  }

  // if (isFetching) return null;
  // if (isLoading) return "loading...";

  return (
    <AuthContext.Provider
      value={{ login, refreshToken, isLoading, isFetching, logout, user }}
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
