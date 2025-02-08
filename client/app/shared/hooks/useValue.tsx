"use client";

import { useState } from "react";

export default function useValue<T>(value: T) {
  const [v, setV] = useState<T>(value);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setV(value as T);
  };
  return {
    value: v,
    set: (t: T | ((prve: T) => T)) => {
      setV(t);
    },
    onChange,
  };
}
