import prisma from "./prisma";
import type { ReadAlram, CreateAlram } from "../types/common";

async function createAlram({ content, userId }: CreateAlram) {
  try {
    const createAlarm = await prisma.alarm.create({
      data: {
        content,
        userId,
      },
    });
    return createAlarm;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getAlram({ userId }: { userId: string }) {
  try {
    return await prisma.alarm.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function readAlram({ userId, id }: ReadAlram) {
  try {
    await prisma.alarm.update({
      where: {
        userId,
        id,
      },
      data: {
        read: true,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}
const alramRepo = {
  createAlram,
  getAlram,
  readAlram,
};
export default alramRepo;
