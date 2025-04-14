"use client";

import Application from "../../create/page";
import { useEffect, useState } from "react";
import { getChallenge, PatchChallenge } from "@/app/service/challenge/api";
import { useParams, useRouter } from "next/navigation";
import type { ChallengeProps } from "@/app/shared/types/common";
import { useToaster } from "@/app/shared/provider/toasterProvider";

export default function Edit() {
  const params: { id: string } = useParams();
  const { id } = params;
  const [form, setForm] = useState<ChallengeProps>();
  const toaster = useToaster();
  const router = useRouter();

  useEffect(() => {
    getChallenge({ id })
      .then((res) => {
        const data = res.data;
        setForm(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params]);

  function handleClick(body: ChallengeProps) {
    if (form && form.title) {
      PatchChallenge(id, { ...body }).then((res) => {
        if (res.ok) {
          toaster("info", "챌린저가 수정됐습니다.");
          router.push("/pages/challenge");
        }
      });
    }
  }
  return (
    <Application
      mainTitle="챌린지 수정"
      formData={form}
      clickHanlde={(body) => handleClick(body)}
      btnText="수정하기"
    ></Application>
  );
}
