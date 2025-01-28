import { useState } from "react";

type PageProps = ex & {
  title: string;
  list: number[];
};

interface PageInter extends ex {
  //합치는거
  title: string | number;
  list: string[];
}

interface ex {
  name: string;
  phone: number;
}

export default function Page({ title, list, name, phone }: PageInter) {
  const [t, setT] = useState<string[] | number[]>([0, 12, 34]);
  return (
    <div>
      <h2></h2>
    </div>
  );
}
