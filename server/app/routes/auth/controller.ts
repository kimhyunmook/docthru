import { Request, Response, Router } from "express";
import service from "./service";

const authRouter = Router();

authRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json({});
});

authRouter.get("/signup", async (req: Request, res: Response) => {
  // service.
  res.status(201).json({});
});

export default authRouter;
