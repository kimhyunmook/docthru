"use client";
import styles from "@/app/styles/page.module.css";
import Input from "./shared/components/input";
import { useState } from "react";
import { isValidEmail } from "@/lib/utils/convenience";
import Chip from "./shared/components/chip/chip";
import Btn from "./shared/components/btn/btn";
import Tab from "./shared/components/tab/tab";
import List from "./shared/components/list";
import Container from "./shared/components/container/container";
import SearchInput from "@/app/shared/components/search";
import Dropdown from "./shared/components/dropdown/dropdown";
import Card from "./shared/components/card/card";
import Reply from "./shared/components/reply/reply";
import Modal from "./shared/components/modal/modal.jtx";

export default function Home() {
  const [email, setEmail] = useState("");
  return (
    <div style={{ marginBottom: "400px" }} className={styles.page}>
      <Input
        label="이메일"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          const { name, value } = e.target;
          setEmail(value);
        }}
        error={"이메일 형식 알아"}
        errorCondition={isValidEmail(email)}
      />
      <Input.Password />
      <Input.Date />
      <Chip.NextChip />
      <Chip.WebChip />
      <Chip.CareerChip />
      <Chip.ModernChip />
      <Chip.ApiChip />
      <Chip.Categori>대기</Chip.Categori>
      <Chip.Accecpt />
      <Chip.Pending />
      <Chip.Delete />
      <Chip.Reject />
      <br />
      <Chip.Card.Compolete /> <Chip.Card.Finish />
      <br />
      <Btn.Filled.Large>버튼</Btn.Filled.Large>
      <Btn.Filled.Large icon={true}>버튼2</Btn.Filled.Large>
      <Btn.Filled.Large icon={true}></Btn.Filled.Large>
      <Btn.Outline.Small>테스트</Btn.Outline.Small>
      <Btn.Transparent.Regular>투명도</Btn.Transparent.Regular>
      <Btn.Solid.Regular>솔리드</Btn.Solid.Regular>
      <Btn.Filled.Yellow>버튼</Btn.Filled.Yellow>
      <br />
      <Tab.Middle size={"s"}></Tab.Middle>
      <Tab.Middle active={true}></Tab.Middle>
      <Tab.Top active={true}></Tab.Top>
      <Tab.Top size="s"></Tab.Top>
      <br />
      <List
        number={0}
        user={{ name: "누구", id: "12", grade: "일반", heart: 2922 }}
      />
      <Container></Container>
      <br />
      <SearchInput />
      <br />
      <Dropdown></Dropdown>
      <Dropdown.Sort></Dropdown.Sort>
      <Dropdown.Login />
      <Card
        state={<Chip.Card.Compolete />}
        chip={<Chip.NextChip />}
        categori={<Chip.Categori>블로그</Chip.Categori>}
      >
        Next.js -APP Router:Routing
      </Card>
      <Reply></Reply>
      <Reply.Textarea></Reply.Textarea>
      <br />
      <Modal.Popup>가입이 완료되었습니다!</Modal.Popup>
      <Modal.TextBox.Reject></Modal.TextBox.Reject>
    </div>
  );
}
