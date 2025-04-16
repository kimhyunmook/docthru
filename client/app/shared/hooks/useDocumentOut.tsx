import { useEffect, useRef } from "react";

type HTMLElementByTag<T extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[T];

export default function useDocumentOut<T extends keyof HTMLElementTagNameMap>(
  type: T,
  cb?: () => void
) {
  const ref = useRef<HTMLElementByTag<T> | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb!();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return ref;
}
