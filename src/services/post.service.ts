import prisma from '../utils/prisma';

export async function createPost(
  mediaUrl: string,
  caption: string,
  userId: string
) {
  const newPost = await prisma.post.create({
    data: {
      mediaUrl,
      userId,
      caption,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      postCount: { increment: 1 },
    },
  });

  return newPost;
}

export async function editCaption(
  postId: string,
  caption: string,
  userId: string
) {
  const edit = await prisma.post.update({
    data: {
      caption,
    },
    where: { id: postId, userId },
  });

  return edit;
}

export async function deletePost(postId: string, userId: string) {
  const edit = await prisma.post.delete({
    where: { id: postId, userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      postCount: { decrement: 1 },
    },
  });

  return edit;
}

export async function getPosts(before?: string, username?: string) {
  const findUser = {
    user: { username },
  };
  const withUser = username ? findUser : {};
  let msg;
  if (!before) {
    msg = await prisma.post.findFirst({
      where: { ...withUser },
    });
  }
  const posts = await prisma.post.findMany({
    take: 5,
    skip: before ? 1 : 0,
    ...((before || msg?.id) && { cursor: { id: before || msg?.id } }),
    include: {
      user: {
        select: { id: true, username: true, imageUrl: true },
      },
    },
    ...(username ? { where: withUser } : {}),
  });
  return posts;
}

export async function viewPost(id: string) {
  const where = { id };
  const t = true;
  const post = await prisma.post.findFirst({
    where,
    include: {
      user: {
        select: { username: t, id: t, imageUrl: t },
      },
    },
  });
  return post;
}
