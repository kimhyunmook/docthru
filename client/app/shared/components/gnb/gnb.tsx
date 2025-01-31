import styles from "@/app/shared/styles/header.module.css";
import LoginBox from "./loginBox";
import LinkImg from "../LinkImg";
import Link from "next/link";
import { User } from "../../types/user";

interface Gnb {
  user: User;
}
export default function Gnb({ user }: Gnb) {
  return (
    <header id={"header"} className={`${styles.header} flexCenter`}>
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
          {user?.grade === "어드민" ? (
            <ul className={`${styles.gnbMenu} flexCenter`}>
              <li>
                <Link href="#">챌린지 관리</Link>
              </li>
              <li>
                <Link href="#">챌린지 목록</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <LoginBox user={user} admin={user?.grade === "어드민"} />
      </nav>
    </header>
  );
}
