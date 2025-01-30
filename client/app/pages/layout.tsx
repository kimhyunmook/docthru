"use client";

import { PropsWithChildren } from "react";

export default function Rootlayout({ children }: PropsWithChildren) {
  return <div id="root">{children}</div>;
}
