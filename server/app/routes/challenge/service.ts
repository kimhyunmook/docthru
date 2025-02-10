import alramRepo, { CreateAlram } from "../../repositorys/alram";
import challengeRepo, { Find, Total } from "../../repositorys/challenge";

async function getChallenge({ page, pageSize, orderBy, where }: Find) {
  const data = await challengeRepo.findList({ page, pageSize, orderBy, where });
  return data;
}

async function updateFinsh({ userId }: Omit<CreateAlram, "content">) {
  const data = await challengeRepo.updateFinish();
  if (!!data?.count) {
    data.data.forEach(async (v) => {
      const content = `"${v.title}" 챌린지가 만료 되었습니다.`;
      await alramRepo.createAlram({ content, userId });
    });
    return data;
  }
  throw console.log("noUpdate");
}

async function total({ where }: Total) {
  const total = await challengeRepo.total({ where });
  return total;
}

const challengeService = {
  getChallenge,
  updateFinsh,
  total,
};

export default challengeService;
