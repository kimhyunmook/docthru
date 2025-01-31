import { PropsWithChildren } from "react";

export interface PropsWithClassName extends PropsWithChildren {
  className?: string;
}

export type ChipType = "nextjs" | "api" | "career" | "modern" | "web" | null;

export interface ChallengeProps {
  title: string;
  originalLink: string;
  field: string;
  documentType: string;
  date: string;
  maximum: string;
  content: string;
}
