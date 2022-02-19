import * as argon2 from "argon2";

export async function hashPwd(payload: string) {
  return argon2.hash(payload);
}

export async function comparePwd(hash: string, password: string) {
  return argon2.verify(hash, password);
}
