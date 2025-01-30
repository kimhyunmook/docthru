import bcrypt from "bcrypt";
import type { Pw, Compare } from "../../types/common";

async function hash({ password }: Pw) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function compare({ password, hashPw }: Compare): Promise<boolean> {
  const compare = await bcrypt.compare(password, hashPw);
  return compare;
}

const Hash = { hash, compare };
export default Hash;
