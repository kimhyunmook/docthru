import { Router } from "express";
import exampleRouter from "./example/controller";
import authRouter from "./auth/controller";
const router = Router();

router.use("/example", exampleRouter);
router.use("/auth", authRouter);

export default router;
