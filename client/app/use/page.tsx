"use client";
import styles from "./styles/use.module.css";
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
import Crystal, { CrystalLayout } from "./crystal/crystal";

const userDumi: User = {
  id: "1",
  name: "테스터",
  grade: "어드민",
  heart: 0,
};

export default function ComponentsUse() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const click = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };
  return (
    <div style={{ marginBottom: "400px" }} className={styles.page}>
      <Crystal>
        <CrystalLayout title="input">
          <Input
            label="테스터"
            name="test"
            type="text"
            value={""}
            onChange={() => {}}
            error={"이메일 형식 아니야"}
            errorCondition={isValidEmail(email)}
          />
          <Input.Email className="" />
          <Input.Password
            label="비밀번호"
            name=""
            value=""
            onChange={() => {}}
            placeholder=""
            className=""
          />
          <Input.Date
            label="마감기한"
            name=""
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className=""
          />
          <SearchInput setData={null} className="" />
        </CrystalLayout>
        <CrystalLayout title="chip">
          <Chip.NextChip className="" />
          <Chip.WebChip className="" />
          <Chip.CareerChip className="" />
          <Chip.ModernChip className="" />
          <Chip.ApiChip className="" />
          <Chip.Categori className="">대기</Chip.Categori>
          <Chip.Accecpt className="" />
          <Chip.Pending className="" />
          <Chip.Delete className="" />
          <Chip.Reject className="" />
          <Chip.Card.Compolete className="" />
          <Chip.Card.Finish className="" />
        </CrystalLayout>
        <CrystalLayout title="button">
          <Btn.Filled.Large
            className=""
            width={"0|auto"}
            icon={false}
            onClick={click}
          >
            라지
          </Btn.Filled.Large>
          <Btn.Filled.Medium
            className=""
            width={"0|auto"}
            icon={true}
            onClick={click}
          >
            미디움
          </Btn.Filled.Medium>
          <Btn.Filled.Regular
            className=""
            width={"0|auto"}
            icon={true}
            onClick={click}
          >
            레귤러
          </Btn.Filled.Regular>
          <Btn.Filled.Small
            className=""
            width={"0|auto"}
            icon={true}
            onClick={click}
          >
            스몰
          </Btn.Filled.Small>
          <Btn.Outline.Small className="" width={"0|auto"} onClick={click}>
            아웃라인
          </Btn.Outline.Small>
          <Btn.Outline.Small
            className=""
            width={"0|auto"}
            icon="/img/icon/arrow_right.svg"
            onClick={click}
          >
            아웃라인 아이콘
          </Btn.Outline.Small>
          <Btn.Transparent.Regular
            className=""
            width={"0|auto"}
            icon={true}
            onClick={click}
          >
            투명
          </Btn.Transparent.Regular>
          <Btn.Solid.Regular className="" width={"0|auto"} onClick={click}>
            솔리드
          </Btn.Solid.Regular>
          <Btn.Filled.Yellow className="" width={"0|auto"} onClick={click}>
            필드
          </Btn.Filled.Yellow>
        </CrystalLayout>
        <CrystalLayout title="tab">
          <Tab.Middle className="" active={false}>
            진행중인 챌린지
          </Tab.Middle>
          <Tab.Middle className="" active={true}>
            진행중인 챌린지
          </Tab.Middle>
          <Tab.Top className="" active={true}>
            탭1
          </Tab.Top>
          <Tab.Top className="" active={false}>
            탭1
          </Tab.Top>
        </CrystalLayout>
        <CrystalLayout title="list" width={900}>
          <List number={0} user={userDumi} />
        </CrystalLayout>
        <CrystalLayout title="conatiner">
          <Container date="0000년 00월 00일" current={0} total={3}></Container>
        </CrystalLayout>
        <CrystalLayout title="dropdown" width={840}>
          <Dropdown
            className=""
            list={["Next.js", "API", "Career", "Modern JS", "Web"]}
          >
            카테고리
          </Dropdown>
          <Dropdown.Sort className=""></Dropdown.Sort>
          <Dropdown.Login className="" user={userDumi} />
        </CrystalLayout>
        <CrystalLayout title="card" width={1040}>
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
        </CrystalLayout>
        <CrystalLayout title="reply" width={870}>
          <Reply userName={userDumi.name} date="날짜입니다" text="날짜" />
          <Reply.Textarea
            userName={userDumi.name}
            value={text}
            setValue={setText}
          ></Reply.Textarea>
        </CrystalLayout>
        <CrystalLayout title="modal" width={600}>
          <Modal.Popup>가입이 완료되었습니다!</Modal.Popup>
          <Modal.TextBox.Reject
            title="거절"
            name="뭘까"
            value={text}
            setValue={setText}
          />
        </CrystalLayout>
      </Crystal>
    </div>
  );
}
