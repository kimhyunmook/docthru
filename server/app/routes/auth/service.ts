import Hash from "../../lib/utils/hash";
import userRepo from "../../repositorys/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config";
import type { Compare, SignupProps, User } from "../../types/common";

async function signup({ email, password, nickname }: SignupProps) {
  const hashpw = await Hash.hash({ password });
  const result = await userRepo.signup({ email, password: hashpw, nickname });
  return result;
}

interface CreateTokenProps {
  user: User;
  type?: "r" | "a";
}
async function createToken({ user, type }: CreateTokenProps) {
  if (user) {
    const payload = { email: user.email, id: user.id };
    const option = { expiresIn: type === "r" ? "2w" : "24h" }; // 2 weeks in seconds and 1 hour in seconds
    try {
      return jwt.sign(
        payload,
        JWT_SECRET as jwt.Secret,
        option as jwt.SignOptions
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  } else {
    console.error("create token error!");
    return null;
  }
}

interface RefreshTokenProps {
  email: string;
  refreshToken: string;
}
async function refreshToken({ email, refreshToken }: RefreshTokenProps) {
  const user = await userRepo.findUser({ email });
  if (!user || !refreshToken) {
    const error = new Error("Unauthorized");
    throw error;
  }
  return createToken({ user, type: "a" });
}

interface LoginProps {
  email: string;
  password: string;
}
async function login({ email, password }: LoginProps) {
  const user: User | null = await userRepo.findUser({ email });
  if (!!user) {
    const verifypw = await verifyPw({ password, hashPw: user.password });
    if (!verifypw) return null;
    return user;
  } else return null;
}

async function verifyPw({ password, hashPw }: Compare) {
  const compare: boolean = await Hash.compare({ password, hashPw });
  return compare;
}

const service = {
  createToken,
  refreshToken,
  login,
  signup,
};
export default service;
