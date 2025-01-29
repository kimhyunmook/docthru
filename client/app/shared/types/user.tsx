export type User = {
  id: string;
  name: string;
  grade: "일반" | "어드민";
  like: number;
} | null;
