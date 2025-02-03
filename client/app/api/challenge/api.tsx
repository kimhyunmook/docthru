import instance from "../instance";
import type { ChallengeProps } from "@/app/shared/types/common";

interface GetChallengeProps {
  page?: string | number;
  pageSize?: string | number;
  orderby?: string;
}

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

export async function PostChallenge(body: ChallengeProps) {
  const res = await instance.post("/api/challenge/create", body);
  return res.data;
}

export async function PatchCallenge(body: ChallengeProps) {
  const res = await instance.patch("/api/challenge/edit", body);
  return res.data;
}

export async function DetailCallenge({ id }: { id: string }) {
  const res = await instance.get(`api/challenge/?id=${id}`);
  console.log(id);
  return res.data;
}
