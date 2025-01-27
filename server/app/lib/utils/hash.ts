import bcrypt from "bcrypt";
import type { Pw, Compare } from "../../types/common";

async function hash({ password }: Pw) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  if (!!hash) throw new Error("hash 실패");
  return hash;
}

async function compare({ password, password2 }: Compare): Promise<boolean> {
  const compare = await bcrypt.compare(password2, password);
  return compare;
}

const Hash = { hash, compare };
export default Hash;
