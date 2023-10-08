import prisma from '../utils/prisma';

export async function getByUsername(username: string) {
	const user = await prisma.user.findFirst({
		where: { username },
	});

	return user;
}

export async function getUserData(cred: string, uname?: string) {
  console.log({ cred, uname });
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: cred }, { username: uname || cred }],
    },
  });
  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: { id },
  });
  return user;
}

export async function searchAccount(searchText: string) {
  const users = await prisma.user.findMany({
    where: {
      username: { contains: searchText }
    },
  });

  return users;
}

export async function deleteAccount(userId: string) {
  const user = await prisma.user.delete({
    where: { id: userId }
  });
  return user;
}