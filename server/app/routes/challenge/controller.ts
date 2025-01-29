import { Request, Response, Router } from "express";
import prisma from "../../repositorys/prisma";
import authMiddleware from "../../middlewares/auth";

const challenge = Router();

challenge.post(
  "/create",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const { title, originalLink, field, date, maximum, content } = req.body;
    const data = await prisma.challenge.create({
      data: {
        title,
        originalLink,
        field,
        date,
        maximum,
        content,
        userId: req.user.id,
      },
    });
    res.status(201).send({ data });
  }
);

challenge.patch(
  "/edit",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { title, originalLink, field, date, maximum, content } = req.body;

    // const data = await prisma.challenge.update({
    //   data: {
    //     title,
    //     originalLink,
    //     field,
    //     date,
    //     maximum,
    //     content,
    //   },
    // });
    // res.status(202).send({ data });
  }
);

export default challenge;
