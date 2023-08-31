import * as bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';

// Mengambil data user
export async function getUserData(cred: string, uname?: string) {
  console.log({ cred, uname });
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: cred }, { username: uname || cred }],
    },
  });
  return user;
}

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

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: { id },
  });
  return user;
}
