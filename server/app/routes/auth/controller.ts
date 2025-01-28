import { Request, Response, Router } from "express";
import service from "./service";
import { error } from "console";

const authRouter = Router();

authRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json({});
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(req);
  try {
  } catch (error) {
    console.error(error);
  }
  res.status(201).json({});
});

export default authRouter;
