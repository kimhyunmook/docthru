import MyChallenge from "@/app/pages/challenge/my/page";
import { PropsWithChildren } from "react";

export interface PropsWithClassName extends PropsWithChildren {
  className?: string;
}

export type ChipType = "next.js" | "api" | "career" | "modern" | "web" | null;
export type DocumentType = "블로그" | "공식문서";
export interface ChallengeProps {
  title: string;
  originalLink: string;
  field: string;
  documentType: DocumentType;
  date: string;
  maximum: string | number;
  content: string;
}
export interface Challenge extends ChallengeProps {
  id: string;
  current: number;
  maximum: number;
}

export type MyChallengeProps = "participating" | "finish" | "apply";
