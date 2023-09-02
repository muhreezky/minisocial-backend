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