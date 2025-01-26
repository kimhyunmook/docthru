import authRepo from "../../repositorys/auth";
import type { SignupProps } from "../../types/common";

async function signup({ email, password, nickName }: SignupProps) {
  const res = await authRepo.signup({ email, password, nickName });
  return !!res;
}

interface CreateTokenProps {
  email: string;
  type: "r" | "a";
}
async function createToken({ email, type }: CreateTokenProps) {}

interface LoginProps {
  email: string;
}
async function login({ email }: LoginProps) {
  const user = await authRepo.findUser({ email });
}

const service = {
  createToken,
  login,
  signup,
};
export default service;
