import { Request, Response, Router } from "express";
import authMiddleware from "../../middlewares/auth";
import userService from "./service";

const userRouter = Router();

userRouter.get(
  "/",
  authMiddleware.accessTokenChk,
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const user = await userService.getUser({ email: req.user.email });
    res.status(200).json(user);
  }
);

userRouter.get(
  "/alram",
  authMiddleware.accessTokenChk,
  authMiddleware.verifyAT,
  async (req, res) => {
    const userId = req.user.id;
    const alram = await userService.getAlram({ userId });
    console.log("alram", alram);
    res.status(200).json({ alram });
  }
);

export default userRouter;
