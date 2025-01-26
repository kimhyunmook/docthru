import instance from "../instance";

interface bodyProps {
  name: string;
  nickName: string;
  password: string;
}
export async function signupApi(body: bodyProps) {
  const res = await instance.post("/signup", body);
  return await res.data;
}

// signupApi({ name: "d", nickName: "00", password: "false" });
