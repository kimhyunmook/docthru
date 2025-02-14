import alramRepo from "../../repositorys/alram";
import userRepo from "../../repositorys/user";
import type { ReadAlram } from "../../types/common";

async function getUser({ email }: { email: string }) {
  const user = await userRepo.findUser({ email });
  return user;
}
async function getAlram({ userId }: { userId: string }) {
  const alram = await alramRepo.getAlram({ userId });
  return alram;
}
async function readAlram({ userId, id }: ReadAlram) {
  return await alramRepo.readAlram({ userId, id });
}

const userService = {
  getUser,
  getAlram,
  readAlram,
};

export default userService;
