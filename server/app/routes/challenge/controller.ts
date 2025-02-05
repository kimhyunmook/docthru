import { Request, Response, Router } from "express";
import prisma from "../../repositorys/prisma";
import authMiddleware from "../../middlewares/auth";
import cron from "node-cron";
import { ParticiPant } from "../../types/common";

const challenge = Router();

challenge.get("/", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const pageSize = parseInt(req.query.pageSize as string);
  let orderby = req.query.orderby as string;
  const keyword = req.query.keyword as string;
  try {
    const data = await prisma.challenge.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [orderby]: "desc",
      },
    });
    const total = (
      await prisma.challenge.findMany({
        where: {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        },
      })
    ).length;
    res.status(200).send({ data, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

challenge.post(
  "/create",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
      const {
        title,
        originalLink,
        field,
        date,
        maximum,
        content,
        documentType,
      } = req.body;
      const data = await prisma.challenge.create({
        data: {
          title,
          originalLink,
          field,
          date: new Date(date),
          current: 1,
          maximum: parseInt(maximum),
          documentType,
          content,
          onerId: userId,
        },
      });
      const participantData: ParticiPant = {
        userId,
        challengeId: data.id,
        state: "paticipate",
      };
      const participant = await prisma.participant.create({
        data: participantData,
      });
      res
        .status(201)
        .send({ success: true, data: !!data, participant: !!participant });
    } catch (err) {
      console.log(err);
    }
  }
);

challenge.patch(
  "/edit",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    // console.log(req.body);
    // const { title, originalLink, field, date, maximum, content } = req.body;
    // const data = await prisma.challenge.update({
    // });
    // res.status(202).send({ data });
  }
);

challenge.get(
  "/:type",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const userId = req.user.id;
    try {
      if (type === "participating" || type === "finish") {
        const data = await prisma.participant.findMany({
          where: {
            userId,
            state: "paticipate",
          },
          include: {
            challenge: true,
          },
        });
        let challenge = data.map((v) => v.challenge);
        if (type === "finish") {
          challenge = challenge.filter((x) => x.state === "finish");
        }
        res.status(200).json({ data, challenge });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

cron.schedule("0 0 * * *", async () => {
  console.log("매일 자정에 실행됨:", new Date().toLocaleString());
  // 여기에 실행할 작업 추가
  await prisma.challenge.updateMany({
    where: {
      createdAt: {
        lt: new Date(), // 현재 시간보다 작은 경우만 필터링
      },
    },
    data: {
      state: "finish",
    },
  });
});

export default challenge;
