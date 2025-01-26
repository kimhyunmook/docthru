import prisma from "../prisma";
async function example(where: { uuid: string }) {
  try {
    const data = await prisma.example.findMany({
      where,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}
const exampleRepo = {
  example,
};
export default exampleRepo;
