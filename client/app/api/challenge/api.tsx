import instance from "../instance";
import type {
  ChallengeProps,
  MyChallengeProps,
  GetChallengeProps,
} from "@/app/shared/types/common";

export async function GetChallenge({
  page = 1,
  pageSize = 10,
  orderby = "createdAt",
  keyword = "",
}: GetChallengeProps) {
  const res = await instance.get(
    `/api/challenge/?page=${page}&pageSize=${pageSize}&orderby=${orderby}&keyword=${keyword}`
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

export async function MyChallengeApi({
  page = 1,
  pageSize = 5,
  orderby = "createdAt",
  keyword = "",
  type = "participating",
}: MyChallengeProps) {
  try {
    const res = await instance.get(
      `/api/challenge/${type}?page=${page}&pageSize=${pageSize}&orderby=${orderby}&keyword=${keyword}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function MyApplyApi({
  page = 1,
  pageSize = 10,
  orderby = "",
  keyword = "",
}: Omit<MyChallengeProps, "type">) {
  try {
    const res = await instance.get(
      `/api/challenge/apply?page=${page}&pageSize=${pageSize}&orderby=${orderby}&keyword=${keyword}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function DetailCallenge({ id }: { id: string }) {
  const res = await instance.get(`api/challenge/${id}`);
  // console.log(id);
  return res.data;
}
