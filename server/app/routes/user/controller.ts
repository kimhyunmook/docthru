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
  async (req, res, next) => {
    const userId = req.user.id;
    const alarm = await userService.getAlram({ userId });
    res.status(200).json({ alarm });
  }
);

userRouter.get(
  "/alram/:id",
  authMiddleware.accessTokenChk,
  authMiddleware.verifyAT,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const id = parseInt(req.params.id);
      userService.readAlram({ userId, id });
      res.status(200).json(true);
    } catch (err) {
      res.status(400).json(false);
    }
  }
);

export default userRouter;
