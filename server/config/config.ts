import dotenv from "dotenv";
dotenv.config();

const { PORT, JWT_SECRET } = process.env;

if (!!!JWT_SECRET) new Error("JWT_SCRECT 설정해");
export { PORT, JWT_SECRET };
