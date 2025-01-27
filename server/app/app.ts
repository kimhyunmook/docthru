import express, { Request, Response } from "express";
import { ORIGIN, PORT } from "../config/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/route";

const app = express();
const SERVICE_PORT = PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN || ["*"],
    credentials: true,
  })
);
app.use("/api", router);

app.listen(SERVICE_PORT, () => {
  console.log(`SERVER PORT: ${SERVICE_PORT}`);
});
