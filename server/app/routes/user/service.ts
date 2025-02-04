import userRepo from "../../repositorys/user";

async function getUser({ email }: { email: string }) {
  const user = await userRepo.findUser({ email });
  return user;
}

const userService = {
  getUser,
};

export default userService;
