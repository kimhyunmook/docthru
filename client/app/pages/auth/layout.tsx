import { PropsWithChildren } from "react";
import s from "./layout.module.css";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div id={s.auth}>{children}</div>;
}
