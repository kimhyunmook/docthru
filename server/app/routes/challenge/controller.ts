import { Request, Response, Router } from "express";
import prisma from "../../repositorys/prisma";
import authMiddleware from "../../middlewares/auth";
import cron from "node-cron";
import { ParticiPant } from "../../types/common";
import { Prisma } from "@prisma/client";

const challenge = Router();

challenge.get("/", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  let orderby = (req.query.orderby as string) || "createdAt";
  const keyword = req.query.keyword as string;
  const fieldQuery = req.query.field as string;
  const documentTypeQuery = req.query.documentType as string;
  const stateQuery = req.query.state as string;

  try {
    let where: Prisma.challengeWhereInput = {};
    let AND: Prisma.challengeWhereInput[] = [];
    let OR: Prisma.challengeWhereInput[] = [];
    const keyword_OR: Prisma.challengeWhereInput[] = [];
    const filter_OR: Prisma.challengeWhereInput[] = [];
    if (!!keyword)
      keyword_OR.push(
        { title: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } }
      );
    if (!!fieldQuery) {
      const field = fieldQuery.split(",");
      field.forEach((value) => {
        filter_OR.push({ field: { contains: value, mode: "insensitive" } });
      });
    }
    if (!!documentTypeQuery) {
      const documentType = documentTypeQuery.split(",");
      documentType.forEach((value) => {
        filter_OR.push({
          documentType: { contains: value, mode: "insensitive" },
        });
      });
    }
    if (!!stateQuery) {
      const state = stateQuery.split(",");
      state.forEach((value) => {
        filter_OR.push({ state: { contains: value, mode: "insensitive" } });
      });
    }

    if (!!keyword_OR.length && !!filter_OR) {
      AND = [{ OR: keyword_OR }, { OR: filter_OR }];
      where = { ...where, AND };
    } else if (!!keyword_OR.length) {
      OR = [...keyword_OR];
      where = { ...where, OR };
    } else if (!!filter_OR.length) {
      OR = [...filter_OR];
      where = { ...where, OR };
    }

    const data = await prisma.challenge.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [orderby]: "desc",
      },
    });
    await prisma.challenge.updateMany({
      where: {
        state: "inProgress",
        date: {
          lt: new Date(), // 현재 시간보다 작은 경우만 필터링
        },
      },
      data: {
        state: "finish",
      },
    });

    const total = (
      await prisma.challenge.findMany({
        where,
      })
    ).length;
    // console.log(data, total);

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
  "/apply",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);
    let orderby = req.query.orderby as string;
    const keyword = req.query.keyword as string;
    try {
      const data = await prisma.participant.findMany({
        where: {
          userId: {
            not: userId,
          },
          // state: "pending",
        },
      });
      const challengeId = data.map((v) => {
        return v.challengeId;
      });
      const challenge = await prisma.challenge.findMany({
        where: {
          id: { in: [...challengeId] },
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

      res.status(200).json({ data, challenge, total: data.length });
    } catch (err) {
      console.log(err);
    }
  }
);

challenge.get(
  "/:type",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const userId = req.user.id;
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);
    let orderby = req.query.orderby as string;
    const keyword = req.query.keyword as string;

    try {
      if (type === "participating" || type === "finish") {
        const data = await prisma.participant.findMany({
          where: {
            userId,
            state: "paticipate",
          },
          select: {
            challengeId: true,
          },
        });
        const challengeId = data.map((v) => {
          return v.challengeId;
        });
        let challenge = await prisma.challenge.findMany({
          where: {
            id: { in: [...challengeId] },
            OR: [
              { title: { contains: keyword, mode: "insensitive" } },
              { content: { contains: keyword, mode: "insensitive" } },
            ],
            state: type === "finish" ? "finish" : undefined,
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

        res.status(200).json({ data, challenge, total });
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
