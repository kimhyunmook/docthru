import { Request, Response, Router } from "express";
import service from "./service";
import { BodyResult } from "../../types/common";

const authRouter = Router();

authRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json({});
});

authRouter.get("/signup", async (req: Request, res: Response) => {
  // service.
  res.status(201).json({});
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let result: BodyResult = { success: false };
  const login = await service.login({ email, password });
  if (!login) {
    res.status(401).json(result);
    return;
  }

  const at = await service.createToken({ user: login, type: "a" });
  const rt = await service.createToken({ user: login, type: "r" });
  result = { success: true };
  res
    .cookie("accessToken", at, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    .cookie("refreshToken", rt, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 14,
    })
    .status(201)
    .json(result);
});
export default authRouter;
