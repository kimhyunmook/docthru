import { Request, Response, Router } from "express";
import prisma from "../../repositorys/prisma";
import authMiddleware from "../../middlewares/auth";

const challenge = Router();

challenge.get("/", async (req: Request, res: Response) => {
  const { page, pageSize, orderby } = req.query;
  const data = await prisma.challenge.findMany();
  res.status(200).send({ data });
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
          userId: req.user.id,
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

// challenge.post("/detail", async (req: Request, res: Response) => {
//   try {
//     const data = await prisma.challenge.findMany({
//       where: { id },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

challenge.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log("야야", id);
    const data = await prisma.challenge.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(201).send({ data });
  } catch (err) {
    console.log(err);
  }
});

export default challenge;
