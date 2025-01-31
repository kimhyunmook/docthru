import { PropsWithChildren } from "react";

export interface PropsWithClassName extends PropsWithChildren {
  className?: string;
}

export type ChipType = "nextjs" | "api" | "career" | "modern" | "web" | null;
