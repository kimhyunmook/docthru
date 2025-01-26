import { NextFunction, Request, Response } from "express";

async function example(req: Request, res: Response, next: NextFunction) {
  try {
    const cookie = req.cookies;
    if (!cookie) throw new Error("에러");
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const exampleMiddle = {
  example,
};
export default exampleMiddle;
