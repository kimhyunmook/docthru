import { Request, Response, Router } from "express";
import prisma from "../../repositorys/prisma";
import authMiddleware from "../../middlewares/auth";

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
          maximum: parseInt(maximum),
          documentType,
          content,
          onerId: req.user.id,
        },
      });
      res.status(201).send({ success: true, data });
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

challenge.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // console.log("야야", id);
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
    res.status(201).send({ data });
  } catch (err) {
    console.log(err);
  }
});

challenge.get(
  "/:type",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const userId = req.user.id;
    try {
      const data = await prisma.participant.findMany({
        where: {
          userId,
        },
        include: {
          challenge: true,
        },
      });
      const challenge = data.map((v) => {
        return v.challenge;
      });
      res.status(200).json({ data, challenge });
    } catch (err) {}
  }
);

export default challenge;
