import { Request, Response, Router } from "express";
import service from "./service";
import { BodyResult } from "../../types/common";
import prisma from "../../repositorys/prisma";

const authRouter = Router();

authRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json({});
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  try {
    const data = await prisma.user.create({
      data: { email, password, nickname },
    });
    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  let result: BodyResult = { success: false };
  const login = await service.login({ email, password });
  if (!login) {
    res.status(401).json(result);
    return;
  }

  const at = await service.createToken({ user: login, type: "a" });
  const rt = await service.createToken({ user: login, type: "r" });
  result = { success: true, accessToken: at };
  res
    .cookie("refreshToken", rt, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 14,
    })
    .status(201)
    .json(result);
});
export default authRouter;
