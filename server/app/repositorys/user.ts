import prisma from "./prisma";
import type { SignupProps, User } from "../types/common";

async function signup({ email, password, nickname }: SignupProps) {
  try {
    const result = await prisma.user.create({
      data: {
        email,
        password,
        nickname,
      },
    });

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      success: false,
      code: err?.code,
      model: err?.meta.modelName,
    };
  }
}

async function findUser({ email }: { email: string }) {
  try {
    const res: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        alarm: {
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
    });
    return res;
  } catch (err) {
    return null;
  }
}

const userRepo = {
  signup,
  findUser,
};

export default userRepo;
