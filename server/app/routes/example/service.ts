import exampleRepo from "../../repositorys/example/example";

async function example(where: { uuid: string }) {
  const example = await exampleRepo.example(where);
  return example;
}

const service = {
  example,
};

export default service;
