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
      const { title, originalLink, field, date, maximum, content } = req.body;
      const data = await prisma.challenge.create({
        data: {
          title,
          originalLink,
          field,
          date: new Date(date),
          maximum: parseInt(maximum),
          content,
          // onerId: req.user.id,
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

challenge.get(
  "/:type",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const id = req.user.id;
    console.log(type);
    try {
      const data = await prisma.challenge.findMany({
        where: {
          userId: id,
        },
      });
      console.log(data);
      res.status(200).json({ data });
    } catch (err) {}
  }
);

export default challenge;
