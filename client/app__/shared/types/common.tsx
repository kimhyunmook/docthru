import { PropsWithChildren } from "react";

export interface PropsWithClassName<T = {}> extends PropsWithChildren {
  className?: string;
}
