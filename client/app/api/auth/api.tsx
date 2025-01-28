import instance from "../instance";

interface bodyProps {
  email: string;
  nickname: string;
  password: string;
}
export async function signupApi(body: bodyProps) {
  console.log(body);
  const res = await instance.post("/api/auth/signup", body);
  return await res.data;
}

// signupApi({ name: "d", nickName: "00", password: "false" });
