"use client";
import { useEffect } from "react";
import Participating from "./participating";
import { useParams } from "next/navigation";
import useValue from "@/app/shared/hooks/useValue";

export default function MyType() {
  const params = useParams();
  const element = useValue(<></>);

  useEffect(() => {
    switch (params.type) {
      case "participating":
        element.set(<Participating />);
        break;
      case "finish":
        element.set(<></>);
        break;
      case "apply":
        element.set(<></>);
        break;
    }
  }, [params]);

  return <>{element.value}</>;
}
