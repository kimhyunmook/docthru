"use client";
import styles from "@/app/shared/styles/chip.module.css";
import { firstUpperCase, isEnglishOnly } from "@/lib/utils/convenience";
import Card from "./card";

function Chip({ bg, color, children, className }) {
  const english = isEnglishOnly(children);
  return (
    <p
      className={`${styles.chip} ${className} ${
        english ? styles.quantico : ""
      }`}
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
function NextChip({ className }) {
  return (
    <Chip className={`${styles.next} ${chipType} ${className}`}>Next.js</Chip>
  );
}
function ApiChip({ className }) {
  return <Chip className={`${styles.api} ${chipType} ${className}`}>API</Chip>;
}
function CareerChip({ className }) {
  return (
    <Chip className={`${styles.career} ${chipType} ${className}`}>Career</Chip>
  );
}
function ModernChip({ className }) {
  return (
    <Chip className={`${styles.modern} ${chipType} ${className}`}>
      Modern JS
    </Chip>
  );
}
function WebChip({ className }) {
  return <Chip className={`${styles.web} ${chipType} ${className}`}>Web</Chip>;
}
function Categori({ className, children }) {
  return (
    <Chip className={`${styles.categori} ${chipType} ${className}`}>
      {children}
    </Chip>
  );
}

const chipStatus = styles.status;
function Pending({}) {
  return <Chip className={`${styles.pending} ${chipStatus}`}>승인 대기</Chip>;
}
function Reject({}) {
  return <Chip className={`${styles.reject} ${chipStatus}`}>신청 거절</Chip>;
}
function Accecpt({}) {
  return <Chip className={`${styles.accecpt} ${chipStatus}`}>신청 승인</Chip>;
}
function Delete({}) {
  return <Chip className={`${styles.delete} ${chipStatus}`}>챌린지 삭제</Chip>;
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
