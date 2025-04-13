import alramRepo from "../../repositorys/alram";
import challengeRepo, { Find, Total } from "../../repositorys/challenge";
import { CreateParticipant } from "../../types/common";

async function getChallenge({ page, pageSize, orderBy, where }: Find) {
  const data = await challengeRepo.findList({ page, pageSize, orderBy, where });
  return data;
}

async function updateFinsh() {
  const data = await challengeRepo.updateFinish();
  if (!!data?.count) {
    data.data.forEach(async (v) => {
      const content = `"${v.title}" 챌린지가 만료 되었습니다.`;
      await alramRepo.createAlram({ content, userId: v.onerId });
    });
    // const alram = await alramRepo.getAlram({ userId });
    return data;
  }
  // console.log("no update finish");
}

async function total({ where }: Total) {
  const total = await challengeRepo.total({ where });
  return total;
}

async function createParticipant({ userId, challengeId }: CreateParticipant) {
  challengeRepo.createParticipant({ userId, challengeId });
}

async function deleted({ id, userId }: { id: number; userId: string }) {
  const { title, user } = await challengeRepo.deleted({ id, userId });
  if (!!!user.length && !!!title) return false;

  user.forEach(async (v) => {
    const content = `참여 중이신 ${title} 챌린지가 삭제됐습니다.`;
    await alramRepo.createAlram({ content, userId: v.userId });
  });
  return true;
}

const challengeService = {
  getChallenge,
  updateFinsh,
  total,
  createParticipant,
  deleted,
};

export default challengeService;
