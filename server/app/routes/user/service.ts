import alramRepo from "../../repositorys/alram";
import userRepo from "../../repositorys/user";

async function getUser({ email }: { email: string }) {
  const user = await userRepo.findUser({ email });
  return user;
}
async function getAlram({ userId }: { userId: string }) {
  const alram = await alramRepo.getAlram({ userId });
  return alram;
}

const userService = {
  getUser,
  getAlram,
};

export default userService;
