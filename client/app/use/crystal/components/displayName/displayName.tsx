"use cleint";
import { ComponenetValue } from "../../crystalModal";
import s from "./displayName.module.css";
import Image from "next/image";
import IconDocument from "../../img/document.svg";

interface DisplayNameProps {
  component: ComponenetValue;
}
export default function DisplayName({ component }: DisplayNameProps) {
  const displayName = !!Object.keys(component?.props ?? {}).find(
    (x) => x === "children"
  )
    ? `<${component.displayName}></${component.displayName}>`
    : `<${component?.displayName} />`;
  async function clipDisplayName() {
    await navigator?.clipboard?.writeText(displayName);
  }

  return (
    <div className={s.displayName} onClick={clipDisplayName}>
      {displayName}
      <Image src={IconDocument} alt="복사" width={30} height={30} />
    </div>
  );
}
