import { NextFunction, Request, Response, Router } from "express";
import service from "./service";
import { BodyResult } from "../../types/common";
import authMiddleware from "../../middlewares/auth";

const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  let result: BodyResult = { success: true };
  let status = 201;
  let msg = "";
  const signup = await service.signup({
    email,
    password,
    nickname,
  });
  console.log(signup);
  if (!signup.success) {
    status = 400;
    if (signup.model === "user") msg = "이메일 또는 닉네임 중복입니다.";
    result = {
      success: false,
      msg,
    };
  }
  res.status(status).json(result);
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
  result = { success: true, accessToken: at };
  res
    .cookie("refreshToken", rt, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 14,
    })
    .status(201)
    .json(result);
});

authRouter.get(
  "/logout",
  authMiddleware.verifyAT,
  async (req: Request, res: Response, next: NextFunction) => {
    const result: BodyResult = { success: true };
    res.clearCookie("refreshToken");
    res.status(201).send(result);
  }
);

authRouter.post(
  "/refresh",
  authMiddleware.refreshTokenChk,
  authMiddleware.verifyRT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.auth;
      const { refreshToken } = req.cookies;
      const accessToken = await service.refreshToken({ email, refreshToken });
      res.status(201).json({ success: true, accessToken });
    } catch (err) {
      next(err);
      res.status(401).json({ success: false });
    }
  }
);
export default authRouter;
