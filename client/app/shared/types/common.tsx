import { PropsWithChildren } from "react";
import { User } from "./user";

export interface PropsWithClassName extends PropsWithChildren {
  className?: string;
}

export type FieldType =
  | "Next.js"
  | "API"
  | "Career"
  | "Modern JS"
  | "Web"
  | null;
export type DocumentType = "블로그" | "공식문서";
export type StateType =
  | "inProgress"
  | "finish"
  | "delete"
  | "reject"
  | "pending";
export interface ChallengeProps {
  title: string;
  originalLink?: string;
  field?: string;
  documentType?: DocumentType;
  date: Date | string;
  // maximum: string | number;
  content: string;
  codeContent: string;
}
export interface Challenge extends ChallengeProps {
  id: number;
  onerId: string;
  state: StateType;
  current: number;
  maximum: number;
  createdAt: Date;
}

export type ChallengeFilterProps = {
  field?: FieldType[];
  documentType?: DocumentType[];
  state: Omit<StateType, "delete,reject">[];
};
export interface GetChallengeProps {
  pageParam?: string | number;
  pageSize?: string | number;
  orderby?: string;
  keyword?: string;
  filter?: ChallengeFilterProps;
}

export interface MyChallengeProps extends GetChallengeProps {
  type: "participating" | "finish" | "apply";
}

export interface WorkContent {
  id: number;
  title: string;
  content: string;
  user: User;
}
