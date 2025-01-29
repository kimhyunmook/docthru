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
