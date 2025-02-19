import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import type { CreateParticipant, ParticiPant } from "../types/common";

export interface Find {
  where: Prisma.challengeWhereInput;
  page: number;
  pageSize: number;
  orderBy: "createdAt";
}

async function findList({ where, page, pageSize, orderBy }: Find) {
  try {
    const data = await prisma.challenge.findMany({
      where: {
        ...where,
        NOT: {
          state: "deleted",
        },
      },
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
        onerId: true,
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
  try {
    const total = (
      await prisma.challenge.findMany({
        where,
      })
    ).length;
    return total;
  } catch (err) {
    console.log(err);
  }
}

async function createParticipant({ userId, challengeId }: CreateParticipant) {
  try {
    await prisma.participant.create({
      data: {
        challengeId,
        state: "participate",
        userId,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function deleted({ id, userId }: { id: number; userId: string }) {
  try {
    const data = await prisma.challenge.update({
      where: {
        id,
      },
      data: {
        state: "deleted",
      },
    });

    const userList = await prisma.participant.findMany({
      where: {
        challengeId: data.id,
        NOT: {
          userId,
        },
      },
    });
    return { user: userList, title: data.title };
  } catch (err) {
    return { title: "", user: [] };
  }
}

const challengeRepo = {
  findList,
  updateFinish,
  total,
  createParticipant,
  deleted,
};
export default challengeRepo;
