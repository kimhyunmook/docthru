import { AxiosError } from "axios";
import instance from "../instance";

interface SignProps {
  email: string;
  nickname: string;
  password: string;
}
export async function signupApi(body: SignProps) {
  const res = await instance.post("/api/auth/signup", body);
  return await res.data;
}
export type LoginProps = Omit<SignProps, "nickname">;
export async function loginApi(body: LoginProps) {
  try {
    const res = await instance.post("/api/auth/login", body);
    return await res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err.response?.data;
  }
}

// signupApi({ name: "d", nickName: "00", password: "false" });
