"use client";
import styles from "@/app/shared/styles/card.module.css";
import Info from "../container/info";
import Image from "next/image";
import { PropsWithClassName } from "../../types/common";
import useValue from "../../hooks/useValue";
import { useEffect } from "react";
import Chip from "../chip/chip";
import type { FieldType, DocumentType, StateType } from "../../types/common";
import Link from "next/link";
import Btn from "../btn/btn";
import { useAuth } from "../../provider/authProvider";
import { useModal } from "../../provider/modalProvider";
import { deleteChallengeApi } from "@/app/service/challenge/api";
import { useToaster } from "../../provider/toasterProvider";
import { useRouter } from "next/navigation";
import useDocumentOut from "../../hooks/useDocumentOut";

type CardProps = PropsWithClassName & {
  cardId: number;
  field?: FieldType;
  documentType?: DocumentType;
  date: Date | string;
  href: string;
  state: StateType;
  current: number;
  maximum: number;
  onerId?: string;
  continueBtn?: boolean;
};

function Card({
  cardId,
  href = "#",
  field = null,
  documentType,
  className = "",
  date,
  state,
  current = 0,
  maximum = 0,
  continueBtn = false,
  onerId = "",
  children,
}: CardProps) {
  const { user } = useAuth();
  const toast = useToaster();
  const { modalOepn, modalClose, title, buttons } = useModal();
  const chipElement = useValue<React.ReactNode>(null);
  const dropdown = useValue(false);
  const router = useRouter();
  const cardDropdownRef = useDocumentOut("ul", () => {
    dropdown.set(false);
  });

  useEffect(() => {
    switch (field?.toLocaleLowerCase()) {
      case "next.js":
        chipElement.set(<Chip.NextChip />);
        break;
      case "api":
        chipElement.set(<Chip.ApiChip />);
        break;
      case "career":
        chipElement.set(<Chip.CareerChip />);
        break;
      case "modern js":
        chipElement.set(<Chip.ModernChip />);
        break;
      case "web":
        chipElement.set(<Chip.WebChip />);
        break;
    }
  }, [field]);

  const complte = useValue(false);
  useEffect(() => {
    if (current === maximum) complte.set(true);
    else complte.set(false);
  }, [current, maximum]);

  async function deleteChall(challengeId: number) {
    const res = await deleteChallengeApi({ id: challengeId });
    if (res) {
      modalClose();
      toast("info", "삭제 됐습니다.");
      dropdown.set(false);
      router.push("/pages/challenge/delete");
    }
  }

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        {complte.value ? (
          <ul className={styles.state}>
            <li>
              <Chip.Card.Compolete className={styles.compoleteChip} />
            </li>
            {state === "finish" && (
              <li>
                <Chip.Card.Finish className={styles.finishChip} />
              </li>
            )}
          </ul>
        ) : (
          state === "finish" && (
            <ul className={styles.state}>
              <li>
                <Chip.Card.Finish className={styles.finishChip} />
              </li>
            </ul>
          )
        )}
        <Link href={href} className={styles.title}>
          {children}
        </Link>
        {!!field || !!documentType ? (
          <div className={styles.chip}>
            {field && <span>{chipElement.value}</span>}
            {documentType && (
              <span>
                <Chip.Categori>{documentType}</Chip.Categori>
              </span>
            )}
            {user?.id === onerId && (
              <span>
                <Chip.Oner className={styles.onerChip} />
              </span>
            )}
          </div>
        ) : null}
        {user?.id === onerId ? (
          <div className={styles.menu}>
            <Image
              src="/img/icon/menu_bar.svg"
              alt="메뉴"
              width={24}
              height={24}
              onClick={() => {
                dropdown.set((prev) => !prev);
              }}
            />
            {dropdown.value && (
              <ul className={styles.dropdown} ref={cardDropdownRef}>
                <li>
                  <Link href="#">수정</Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      modalOepn();
                      title(`"${children}" 챌린지를 삭제하시겠습니까?`);
                      buttons(
                        <>
                          <Btn.Filled.Regular onClick={modalClose}>
                            취소
                          </Btn.Filled.Regular>
                          <Btn.Solid.Regular
                            onClick={() => deleteChall(cardId)}
                          >
                            삭제
                          </Btn.Solid.Regular>
                        </>
                      );
                    }}
                  >
                    삭제
                  </Link>
                </li>
              </ul>
            )}
          </div>
        ) : null}
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          <Info
            className={styles.infoCon}
            date={date}
            current={current}
            total={maximum}
          />
        </div>
        {continueBtn && (
          <Link href={href} className={styles.countinueBtn}>
            <Btn.Outline.Small icon="/img/icon/arrow_right.svg">
              도전 계속하기
            </Btn.Outline.Small>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
