import bcrypt from "bcrypt";
interface Pw {
  password: string;
}
interface Compare extends Pw {
  password2: string;
}

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
