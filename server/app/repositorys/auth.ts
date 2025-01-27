import Hash from "../lib/utils/hash";
import prisma from "./prisma";
import type { SignupProps, User } from "../types/common";

async function signup({ email, password, nickName }: SignupProps) {
  try {
    const hashpw = await Hash.hash({ password });
    const res = await prisma.user.create({
      data: {
        email,
        password: hashpw,
        nickName,
      },
    });

    return !!res;
  } catch (err) {
    return err;
  }
}

async function findUser({ email }: { email: string }) {
  try {
    const res: User = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return res;
  } catch (err) {
    return null;
  }
}

const authRepo = {
  signup,
  findUser,
};

export default authRepo;
