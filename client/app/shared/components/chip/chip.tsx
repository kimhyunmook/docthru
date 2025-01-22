"use client";
import styles from "@/app/shared/styles/chip.module.css";
import Card from "./card";
import { PropsWithClassName } from "../../types/common";

export type ChipProps = PropsWithClassName & {
  bg?: string;
  color?: string;
};

type ChiptChildProps = Omit<ChipProps, "bg" | "color">;

function Chip({ bg, color, children, className }: ChipProps) {
  return (
    <p
      className={`${styles.chip} ${className}`}
      style={{
        backgroundColor: bg,
        color,
      }}
    >
      {children}
    </p>
  );
}
const chipType = styles.quantico;
function NextChip({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.next} ${chipType} ${className}`}>Next.js</Chip>
  );
}
function ApiChip({ className }: ChiptChildProps) {
  return <Chip className={`${styles.api} ${chipType} ${className}`}>API</Chip>;
}
function CareerChip({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.career} ${chipType} ${className}`}>Career</Chip>
  );
}
function ModernChip({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.modern} ${chipType} ${className}`}>
      Modern JS
    </Chip>
  );
}
function WebChip({ className }: ChiptChildProps) {
  return <Chip className={`${styles.web} ${chipType} ${className}`}>Web</Chip>;
}
function Categori({ className, children }: ChiptChildProps) {
  return (
    <Chip className={`${styles.categori} ${chipType} ${className}`}>
      {children}
    </Chip>
  );
}

const chipStatus = styles.status;
function Pending({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.pending} ${chipStatus} ${className}`}>
      승인 대기
    </Chip>
  );
}
function Reject({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.reject} ${chipStatus} ${className}`}>
      신청 거절
    </Chip>
  );
}
function Accecpt({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.accecpt} ${chipStatus} ${className}`}>
      신청 승인
    </Chip>
  );
}
function Delete({ className }: ChiptChildProps) {
  return (
    <Chip className={`${styles.delete} ${chipStatus} ${className}`}>
      챌린지 삭제
    </Chip>
  );
}

Chip.NextChip = NextChip;
Chip.ApiChip = ApiChip;
Chip.CareerChip = CareerChip;
Chip.ModernChip = ModernChip;
Chip.WebChip = WebChip;
Chip.Categori = Categori;
Chip.Pending = Pending;
Chip.Reject = Reject;
Chip.Accecpt = Accecpt;
Chip.Delete = Delete;

Chip.Card = Card;

export default Chip;
