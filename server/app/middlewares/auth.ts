import { expressjwt, Request } from "express-jwt";
import { JWT_SECRET } from "../../config/config";
import { NextFunction, Response } from "express";

// refresh token
const verifyRT = expressjwt({
  secret: JWT_SECRET as string,
  algorithms: ["HS256"],
  getToken: (req: Request) => {
    return req.cookies.refreshToken;
  },
});

// access token
const verifyAT = expressjwt({
  secret: JWT_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const refreshTokenChk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.cookies;
  const { authorization } = req.headers;
  const accessToken = authorization;
  if (refreshToken && !!!accessToken) return next();
};

const accessTokenChk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const accessToken = authorization;
  if (accessToken) return next();
  res.status(401).json(null);
};

const authMiddleware = { verifyRT, verifyAT, refreshTokenChk, accessTokenChk };

export default authMiddleware;
