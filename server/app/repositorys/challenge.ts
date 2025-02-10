import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export interface Find {
  where: Prisma.challengeWhereInput;
  page: number;
  pageSize: number;
  orderBy: "createdAt";
}

async function findList({ where, page, pageSize, orderBy }: Find) {
  try {
    const data = await prisma.challenge.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [orderBy]: "desc",
      },
    });
    return data;
  } catch (err) {
    return null;
  }
}

async function updateFinish() {
  try {
    const where = {
      state: "inProgress",
      date: {
        lt: new Date(),
      },
    };
    const challenges = await prisma.challenge.findMany({
      where,
      select: {
        title: true,
      },
    });
    const data = await prisma.challenge.updateMany({
      where,
      data: {
        state: "finish",
      },
    });
    return {
      data: challenges,
      count: data.count,
    };
  } catch (err) {
    return null;
  }
}

export interface Total {
  where: Prisma.challengeWhereInput;
}
async function total({ where }: Total) {
  const total = (
    await prisma.challenge.findMany({
      where,
    })
  ).length;
  return total;
}
const challengeRepo = { findList, updateFinish, total };
export default challengeRepo;
