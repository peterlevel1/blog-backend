import { hash, compare } from 'bcrypt';
import { bcryptConfig } from 'configs';

export const bcryptUtil = {
  hashPassword,
  matchPassword,
};

function hashPassword(password: string): Promise<string> {
  return hash(String(password), bcryptConfig.rounds);
}

function matchPassword(password: string, hash: string): Promise<boolean> {
  return compare(String(password), hash);
}
