/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../instance";

export async function getUserAPi() {
  try {
    const res = await instance.get("/api/user");
    const user = await res.data;
    return user;
  } catch (err: any) {
    return err.response.data || null;
  }
}
