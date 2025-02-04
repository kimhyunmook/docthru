export type User = {
  id: string;
  nickname: string;
  grade: "일반" | "어드민";
  like: number;
} | null;
