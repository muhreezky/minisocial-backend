import * as bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { getUserData } from './user.service';

export async function newAccount(
  emailText: string,
  usernameText: string,
  password: string
) {
  try {
    const email = emailText.toLowerCase();
    const username = usernameText.toLowerCase();
    const exists = !!(await getUserData(email, username));
    if (exists) return null;
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    const account = await prisma.user.create({
      data: { email, password: hashed, username, imageUrl: `https://ui-avatars.com/api/?size=200&name=${username}` },
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

export async function changeUsername(userId: string, usernameText: string) {
  try {
    if (!usernameText) return null;
    const username = usernameText.toLowerCase();
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username }
    });
    return user;
  } catch (e: any) {
    return e;
  }
}

export async function changeBioText(userId: string, bioText: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { bioText }
  });
  return user;
}