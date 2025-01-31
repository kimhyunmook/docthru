import { PropsWithChildren } from "react";

export interface PropsWithClassName extends PropsWithChildren {
  className?: string;
}

export type ChipType = "next.js" | "api" | "career" | "modern" | "web" | null;
export type DocumentType = "블로그" | "공식문서" | null;
export interface ChallengeProps {
  title: string;
  originalLink: string;
  field: string;
  documentType: string;
  date: string;
  maximum: string | number;
  content: string;
}
export interface Challenge extends ChallengeProps {
  current: number;
  maximum: number;
}
