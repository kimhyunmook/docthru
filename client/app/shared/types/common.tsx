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
  state: "inProgress" | "finish";
  current: number;
  maximum: number;
}

export interface GetChallengeProps {
  page?: string | number;
  pageSize?: string | number;
  orderby?: string;
  keyword?: string;
}

export interface MyChallengeProps extends GetChallengeProps {
  type: "participating" | "finish" | "apply";
}
