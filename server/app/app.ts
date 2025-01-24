import express, { Request, Response } from "express";
import { PORT } from "../config/config";
const app = express();
const SERVICE_PORT = PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(SERVICE_PORT, () => {
  console.log(`SERVER PORT: ${SERVICE_PORT}`);
});
