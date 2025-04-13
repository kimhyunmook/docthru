import { Request, Response, Router } from "express";
import prisma from "../../repositorys/prisma";
import authMiddleware from "../../middlewares/auth";
import cron from "node-cron";
import { ParticiPant } from "../../types/common";
import { Prisma } from "@prisma/client";
import challengeService from "./service";

const challenge = Router();

challenge.get("/", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  let orderby = (req.query.orderby as "createdAt") || "createdAt";
  const keyword = req.query.keyword as string;
  const fieldQuery = req.query.field as string;
  const documentTypeQuery = req.query.documentType as string;
  const stateQuery = req.query.state as string;

  try {
    let where: Prisma.challengeWhereInput = {};
    let AND: Prisma.challengeWhereInput[] = [];
    let OR: Prisma.challengeWhereInput[] = [];
    const filter_AND: Prisma.challengeWhereInput[] = [];
    const keyword_OR: Prisma.challengeWhereInput[] = [];

    const field_OR: Prisma.challengeWhereInput[] = [];
    const documentType_OR: Prisma.challengeWhereInput[] = [];
    const state_OR: Prisma.challengeWhereInput[] = [];

    if (!!keyword)
      keyword_OR.push(
        { title: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } }
      );
    if (!!fieldQuery) {
      const field = fieldQuery.split(",");
      field.forEach((value) => {
        field_OR.push({ field: { contains: value, mode: "insensitive" } });
      });
    }
    if (!!documentTypeQuery) {
      const documentType = documentTypeQuery.split(",");
      documentType.forEach((value) => {
        documentType_OR.push({
          documentType: { contains: value, mode: "insensitive" },
        });
      });
    }
    if (!!stateQuery) {
      const state = stateQuery.split(",");
      state.forEach((value) => {
        state_OR.push({ state: { contains: value, mode: "insensitive" } });
      });
    }

    if (!!field_OR.length) filter_AND.push({ OR: field_OR });
    if (!!documentType_OR.length) filter_AND.push({ OR: documentType_OR });
    if (!!state_OR.length) filter_AND.push({ OR: state_OR });

    if (!!keyword_OR.length && !!filter_AND.length) {
      AND = [{ OR: keyword_OR }, { AND: filter_AND }];
      where = { ...where, AND };
    } else if (!!keyword_OR.length) {
      OR = [...keyword_OR];
      where = { ...where, OR };
    } else if (!!filter_AND.length) {
      AND = [...filter_AND];
      where = { ...where, AND };
    }

    const data = await challengeService.getChallenge({
      where,
      page,
      pageSize,
      orderBy: orderby,
    });
    await challengeService.updateFinsh();
    // console.log(where, data);

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

    const total = (await challengeService.total({ where })) || 0;
    const nextPage = Math.ceil(total / pageSize) === page ? null : page + 1;
    res.status(200).send({ data, total, nextPage });
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
        state: "participate",
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

challenge.patch("/delete", authMiddleware.verifyAT, async (req, res) => {
  const id = req.body.id as number;
  const userId = req.user.id;
  const result = await challengeService.deleted({ id, userId });
  if (result) res.status(200).send(true);
  else res.status(500).send(false);
});

challenge.get("/:id/work/:listId", async (req: Request, res: Response) => {
  try {
    const { id, listId } = req.params;
    const data = await prisma.challengework.findFirst({
      where: {
        AND: [{ id: Number(listId) }, { challengeId: Number(id) }],
      },
      select: {
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(400).json({ message: "작성글을 찾을 수 없습니다", error });
  }
});

challenge.get("/:id/work", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.challengework.findMany({
      where: { challengeId: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            grade: true,
            like: true,
          },
        },
      },
    });
    res.status(200).send({ data });
  } catch (err) {
    console.log(err);
  }
});

challenge.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.challenge.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        oner: {
          select: {
            nickname: true,
          },
        },
      },
    });
    res.status(200).send({ data });
  } catch (err) {
    console.log(err);
  }
});

challenge.get(
  "/my/apply",
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
          userId,
          // state: "pending",
        },
        select: {
          challengeId: true,
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
      // console.log(challengeId, challenge);
      res.status(200).json({ data, challenge, total: data.length });
    } catch (err) {
      console.log(err);
    }
  }
);

challenge.get(
  "/apply/:challengeId",
  authMiddleware.verifyAT,
  async (req, res) => {
    const userId = req.user.id;
    const challengeId = parseInt(req.params.challengeId);
    await challengeService.createParticipant({ userId, challengeId });
    res.status(200).json(true);
  }
);

challenge.get(
  "/my/:type",
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
            state: "participate",
          },
          select: {
            challengeId: true,
          },
        });
        const challengeId = data.map((v) => {
          return v.challengeId;
        });
        console.log(data);
        let challenge = await prisma.challenge.findMany({
          where: {
            id: { in: [...challengeId] },
            OR: [
              { title: { contains: keyword, mode: "insensitive" } },
              { content: { contains: keyword, mode: "insensitive" } },
            ],
            state: type === "finish" ? "finish" : "inProgress",
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
        // console.log(challenge);
        res.status(200).json({ data, challenge, total });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

cron.schedule("0 0 * * *", async () => {
  console.log("매일 자정에 실행됨:", new Date().toLocaleString());
  // 여기에 실행할 작업 추가
  await challengeService.updateFinsh();
});

challenge.post(
  "/work/create",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const { title, content, id } = req.body;
    const userId = req.user.id;

    const data = await prisma.challengework.create({
      data: {
        title,
        content,
        challengeId: id,
        userId: userId, // userId를 가진 유저와 연결
      },
    });

    res.status(201).json(data);
  }
);

export default challenge;
