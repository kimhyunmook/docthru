import dotenv from "dotenv";

dotenv.config();

let { PORT, JWT_SECRET, ORIGIN } = process.env;
if (!JWT_SECRET) JWT_SECRET = "basic_sceret_key";
const env = {
  PORT,
  JWT_SECRET,
  ORIGIN,
};

export { PORT, JWT_SECRET, ORIGIN };
