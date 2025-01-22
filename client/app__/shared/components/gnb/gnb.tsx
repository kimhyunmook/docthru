import styles from "@/app/shared/styles/header.module.css";
import LoginBox from "./loginBox";
import LinkImg from "../LinkImg";
import Link from "next/link";

export default function Gnb({}) {
  return (
    <header className={`${styles.header} flexCenter`}>
      <nav className={`${styles.gnb}`}>
        <div className={`${styles.left}`}>
          <LinkImg
            className={styles.logo}
            href="/"
            src="/img/logo.svg"
            alt="docthru"
            width={108}
            height={31}
          />
          <ul className={`${styles.gnbMenu} flexCenter`}>
            <li>
              <Link href="#">챌린지 관리</Link>
            </li>
            <li>
              <Link href="#">챌린지 목록</Link>
            </li>
          </ul>
        </div>
        <LoginBox login={true} admin={true} />
      </nav>
    </header>
  );
}
