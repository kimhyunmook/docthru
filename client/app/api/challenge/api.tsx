import instance from "../instance";

interface bodyProps {
  title: string;
  originalLink: string;
  field: string;
  date: string;
  maximum: string;
  content: string;
}
export async function PostChallenge(body: bodyProps) {
  const res = await instance.post("/api/challenge/create", body);
  return res.data;
}

export async function PatchCallenge(body: bodyProps) {
  const res = await instance.patch("/api/challenge/edit", body);
  return res.data;
}
