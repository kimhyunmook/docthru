import prisma from "./prisma";

export interface CreateAlram {
  content: string;
  userId: string;
}
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
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
const alramRepo = {
  createAlram,
  getAlram,
};
export default alramRepo;
