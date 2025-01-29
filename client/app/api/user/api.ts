import instance from "../instance";

export async function getUserAPi() {
  try {
    const res = await instance.get("/api/user");
    return await res.data;
  } catch (err) {
    return { data: null };
  }
}
