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

export default userRouter;
