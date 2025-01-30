import dotenv from "dotenv";

dotenv.config();
console.log("환경 변수 확인:", {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ORIGIN: process.env.ORIGIN,
});
let { PORT, JWT_SECRET, ORIGIN } = process.env;
if (!JWT_SECRET) JWT_SECRET = "basic_sceret_key";

export { PORT, JWT_SECRET, ORIGIN };
