import { expressjwt, Request } from "express-jwt";
import { JWT_SECRET } from "../../config/config";

// refresh token
const verifyRT = expressjwt({
  secret: JWT_SECRET as string,
  algorithms: ["HS256"],
  getToken: (req: Request) => req.cookies.refreshToken,
});

// access token
const verifyAT = expressjwt({
  secret: JWT_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const authMiddleware = { verifyRT, verifyAT };

export default authMiddleware;
