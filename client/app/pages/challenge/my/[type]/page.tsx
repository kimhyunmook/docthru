"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useValue from "@/app/shared/hooks/useValue";
import Participating from "./participating";
// import Finish from "./finish";
// import Apply from "./apply";

export default function MyType() {
  const params = useParams();
  const element = useValue(<></>);

  useEffect(() => {
    switch (params.type) {
      case "participating":
        element.set(<Participating />);
        break;
      case "finish":
        // element.set(<Finish />);
        break;
      case "apply":
        // element.set(<Apply />);
        break;
    }
  }, [params]);

  return <>{element.value}</>;
}
