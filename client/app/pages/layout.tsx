"use client";

import { PropsWithChildren, useEffect } from "react";

export default function Rootlayout({ children }: PropsWithChildren) {
  return <div id="root">{children}</div>;
}
