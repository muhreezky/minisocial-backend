import * as bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { getUserData } from './user.service';

export async function newAccount(
  email: string,
  username: string,
  password: string
) {
  try {
    const exists = !!(await getUserData(email, username));
    if (exists) return null;
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    const account = await prisma.user.create({
      data: { email, password: hashed, username },
    });
    return account;
  } catch (e: any) {
    console.log(e?.stack);
    throw e;
  }
}

export async function login(email: string, password: string) {
  const user = await getUserData(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}
