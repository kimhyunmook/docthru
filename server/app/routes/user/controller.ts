import { Request, Response, Router } from "express";
import authMiddleware from "../../middlewares/auth";
import { BodyResult } from "../../types/common";
import userService from "./service";

const userRouter = Router();

userRouter.get(
  "/",
  authMiddleware.verifyAT,
  async (req: Request, res: Response) => {
    const user = await userService.getUser({ email: req.user.email });
    let result: BodyResult = { success: true, data: user };
    res.status(200).json(result);
  }
);

export default userRouter;
