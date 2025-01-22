"use client";
import styles from "./use.module.css";
import Input from "../shared/components/input/input";
import { useState } from "react";
import { isValidEmail } from "@/lib/utils/convenience";
import Chip from "../shared/components/chip/chip";
import Btn from "../shared/components/btn/btn";
import Tab from "../shared/components/tab/tab";
import List from "../shared/components/list";
import Container from "../shared/components/container/container";
import SearchInput from "@/app/shared/components/search";
import Dropdown from "../shared/components/dropdown/dropdown";
import Card from "../shared/components/card/card";
import Reply from "../shared/components/reply/reply";
import Modal from "../shared/components/modal/modal";

//지울거
import { User } from "../shared/types/user";
import UseLayout from "../shared/layout/useLayout";

const userDumi: User = {
  id: "1",
  name: "테스터",
  grade: "어드민",
  heart: 0,
};

export default function ComponentsUse() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  return (
    <div style={{ marginBottom: "400px" }} className={styles.page}>
      <UseLayout title="input">
        <Input
          label="테스터"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            const { value } = e.target;
            setEmail(value);
          }}
          error={"이메일 형식 알아"}
          errorCondition={isValidEmail(email)}
        />
        <Input.Email />
        <Input.Password />
        <Input.Date />
        <SearchInput />
      </UseLayout>
      <UseLayout title="chip">
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
        <Chip.Card.Compolete /> <Chip.Card.Finish />
      </UseLayout>
      <UseLayout title="button">
        <Btn.Filled.Large>라지</Btn.Filled.Large>
        <Btn.Filled.Medium icon={true}>미디움</Btn.Filled.Medium>
        <Btn.Filled.Regular icon={true}>레귤러</Btn.Filled.Regular>
        <Btn.Filled.Small>스몰</Btn.Filled.Small>
        <Btn.Outline.Small>아웃라인</Btn.Outline.Small>
        <Btn.Transparent.Regular>투명</Btn.Transparent.Regular>
        <Btn.Solid.Regular>솔리드</Btn.Solid.Regular>
        <Btn.Filled.Yellow>필드</Btn.Filled.Yellow>
      </UseLayout>
      <UseLayout title="tab">
        <Tab.Middle></Tab.Middle>
        <Tab.Middle active={true}></Tab.Middle>
        <Tab.Top active={true}></Tab.Top>
        <Tab.Top></Tab.Top>
      </UseLayout>
      <UseLayout title="list" width={900}>
        <List number={0} user={userDumi} />
      </UseLayout>
      <UseLayout title="container">
        <Container date="0000년 00월 00일" current={0} total={3}></Container>
      </UseLayout>
      <UseLayout title="dropdown" width={840}>
        <Dropdown></Dropdown>
        <Dropdown.Sort></Dropdown.Sort>
        <Dropdown.Login />
      </UseLayout>
      <UseLayout title="card" width={1040}>
        <Card
          state={<Chip.Card.Compolete />}
          chip={<Chip.NextChip />}
          categori={<Chip.Categori>블로그</Chip.Categori>}
          date="00000"
          current={0}
          total={3}
        >
          Next.js -APP Router:Routing
        </Card>
      </UseLayout>
      <UseLayout title="reply" width={870}>
        <Reply userName={userDumi.name} date="날짜입니다" text="날짜" />
        <Reply.Textarea
          userName={userDumi.name}
          value={text}
          setValue={setText}
        ></Reply.Textarea>
      </UseLayout>
      <UseLayout title="modal" width={600}>
        <Modal.Popup>가입이 완료되었습니다!</Modal.Popup>
        <Modal.TextBox.Reject
          title="거절"
          name="뭘까"
          value={text}
          setValue={setText}
        >
          칠드런은 뭘까
        </Modal.TextBox.Reject>
      </UseLayout>
    </div>
  );
}
