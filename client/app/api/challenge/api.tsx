import instance from "../instance";

interface GetChallengeProps {
  page?: string | number;
  pageSize?: string | number;
  orderby?: string;
}

// export async function GetChallenge() {
//   const res = await instance.get(`/api/challenge/`);
//   console.log("?", res);
//   return await res.data;
// }

export async function GetChallenge({
  page,
  pageSize,
  orderby,
}: GetChallengeProps) {
  const res = await instance.get(
    `/api/challenge/?page=${page}&pageSize=${pageSize}&orderby=${orderby}`
  );
  return await res.data;
}

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
