import express, { Request, Response } from "express";
import { PORT } from "../config/config";
import router from "./routes/route";
import cors from "cors";

const app = express();
const SERVICE_PORT = PORT || 8000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", router);

app.listen(SERVICE_PORT, () => {
  console.log(`SERVER PORT: ${SERVICE_PORT}`);
});
