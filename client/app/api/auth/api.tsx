/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import instance from "../instance";

interface SignProps {
  email: string;
  nickname: string;
  password: string;
}
export async function signupApi(body: SignProps) {
  try {
    const res = await instance.post("/api/auth/signup", body);
    return await res.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return await err.response?.data;
    }
  }
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

export async function refreshTokenApi() {
  try {
    const res = await instance.post("/api/auth/refresh");
    console.log("res", res);
    return await res.data;
  } catch (err) {
    return err;
  }
}

export async function logoutApi() {
  try {
    const res = await instance.get(`/api/auth/logout`);
    return await res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err.response?.data;
  }
}
// signupApi({ name: "d", nickName: "00", password: "false" });
