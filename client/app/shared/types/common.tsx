import { PropsWithChildren } from "react";

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
export type StateType = "inProgress" | "finish" | "delete" | "reject";
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
  state: StateType;
  current: number;
  maximum: number;
}

export type ChallengeFilterProps = {
  field?: FieldType[];
  documentType?: DocumentType[];
  state: Omit<StateType, "delete,reject">[];
};
export interface GetChallengeProps {
  page?: string | number;
  pageSize?: string | number;
  orderby?: string;
  keyword?: string;
  filter?: ChallengeFilterProps;
}

export interface MyChallengeProps extends GetChallengeProps {
  type: "participating" | "finish" | "apply";
}
