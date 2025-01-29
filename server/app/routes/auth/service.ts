import Hash from "../../lib/utils/hash";
import userRepo from "../../repositorys/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET, PORT } from "../../../config/config";
import type { Compare, SignupProps, User } from "../../types/common";

async function signup({ email, password, nickname }: SignupProps) {
  const hashpw = await Hash.hash({ password });

  const res = await userRepo.signup({ email, password: hashpw, nickname });
  return !!res;
}

interface CreateTokenProps {
  user: User;
  type?: "r" | "a";
}
async function createToken({ user, type }: CreateTokenProps) {
  if (user) {
    const payload = { email: user.email, id: user.id };
    const option = { expiresIn: type === "r" ? "1209600" : "3600" }; // 2 weeks in seconds and 1 hour in seconds
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
    console.error("create token error");
    return null;
  }
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
  login,
  signup,
};
export default service;
