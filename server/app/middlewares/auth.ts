import { expressjwt, Request } from "express-jwt";
import { JWT_SECRET } from "../../config/config";

// refresh token
const verifyRT = expressjwt({
  secret: JWT_SECRET as string,
  algorithms: ["HS256"],
  getToken: (req: Request) => req.cookies.refreshToken,
}).unless({
  custom: (req: Request) => {
    const { refreshToken } = req.cookies;
    const { authorization } = req.headers;
    const accessToken = authorization;
    return refreshToken && !!accessToken;
  },
});

// access token
const verifyAT = expressjwt({
  secret: JWT_SECRET as string,
  algorithms: ["HS256"],
  getToken: (req: Request) => req.cookies.accessToken,
  requestProperty: "user",
}).unless({
  custom: (req) => {
    const { authorization } = req.headers;
    const accessToken = authorization;
    return !!accessToken;
  },
});

const authMiddleware = { verifyRT, verifyAT };

export default authMiddleware;
