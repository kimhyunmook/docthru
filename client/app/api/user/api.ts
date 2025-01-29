import instance from "../instance";

export async function getUserAPi() {
  const res = await instance.get("/api/user");
  return await res.data;
}
