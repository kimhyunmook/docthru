"use client";

import { useState } from "react";

export default function useValue(value: any) {
  const [v, setV] = useState<typeof value>(value);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setV(value);
  };
  return {
    value: v,
    set: (t: typeof v) => {
      setV(t);
    },
    onChange,
  };
}
