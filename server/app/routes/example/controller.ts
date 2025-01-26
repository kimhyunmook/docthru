import { Request, Response, Router } from "express";
import service from "./service";

const exampleRouter = Router();

exampleRouter.get("/example", async (req: Request, res: Response) => {
  const example = await service.example({ uuid: "uuid무언가" });
  if (!example) {
    res.status(402).json({
      success: false,
    });
    return;
  }
  res.status(200).json({
    success: true,
  });
});

export default exampleRouter;
