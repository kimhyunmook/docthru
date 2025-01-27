import dotenv from "dotenv";
dotenv.config();

const { PORT, JWT_SECRET, ORIGIN } = process.env;

export { PORT, JWT_SECRET, ORIGIN };
