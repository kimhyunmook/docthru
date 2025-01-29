import { loginApi, LoginProps } from "@/app/api/auth/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import useValue from "../hooks/useValue";
import { getUserAPi } from "@/app/api/user/api";
import type { User } from "../types/user";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextType {
  login: ({ email, password }: LoginProps) => Promise<void>;
  user: User;
}

const AuthContext = createContext<AuthContextType | null>(null);
const expired = 60 * 60 * 1000;

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const storage = useLocalStorage();
  const token = useValue(null);
  // const [user, setUser] = useState<User>(null);
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
    console.log("token", token.value);
    // setUser(data);
    userRefetch();
  }, [isStale, token.value]);
  async function login({ email, password }: LoginProps) {
    const res = await loginApi({ email, password });
    if (!res.success) {
      alert("로그인 실패");
      return;
    }
    token.set(storage.set("token", res.accessToken, expired));
    router.push("/pages");
  }
  if (isLoading) return "loading...";
  if (isPending) return null;

  return (
    <AuthContext.Provider value={{ login, user: user.data }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider 내부에서 사용해주세요.");
  return context;
}
