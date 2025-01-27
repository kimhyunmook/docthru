import Hash from "../../lib/utils/hash";
import authRepo from "../../repositorys/auth";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config";
import type { Compare, SignupProps, User } from "../../types/common";

async function signup({ email, password, nickName }: SignupProps) {
  const res = await authRepo.signup({ email, password, nickName });
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
    return jwt.sign(
      payload,
      JWT_SECRET as jwt.Secret,
      option as jwt.SignOptions
    );
  } else {
    console.error("create token error");
    return null;
  }
}

interface LoginProps {
  email: string;
}
async function login({ email }: LoginProps) {
  const user: User | null = await authRepo.findUser({ email });
  // console.log()
  // if (verifyPw(user?.password,))
}

async function verifyPw({ password, password2 }: Compare) {
  const compare: boolean = await Hash.compare({ password, password2 });
  return compare;
}

const service = {
  createToken,
  login,
  signup,
};
export default service;
