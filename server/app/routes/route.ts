import { Router } from "express";
import exampleRouter from "./example/controller";
import authRouter from "./auth/controller";
import userRouter from "./user/controller";
const router = Router();

router.use("/example", exampleRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
