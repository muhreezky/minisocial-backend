import * as bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';

export async function newAccount(email: string, username: string, password: string) {
  try {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    const account = await prisma.user.create({
      data: { email, password: hashed, username },
    });
    return account;
  } catch (e: unknown) {
    throw e;
  }
}

export async function getUserData(email: string) {
  const user = await prisma.user.findFirst({ where: { email } });
  return user;
}

export async function login(email: string, password: string) {
  const user = await getUserData(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}