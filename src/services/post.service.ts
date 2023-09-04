import prisma from '../utils/prisma';

export async function createPost(mediaUrl: string, caption: string, userId: string) {
  const newPost = await prisma.post.create({
    data: {
      mediaUrl,
      userId,
      caption
    }
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      postCount: { increment: 1 }
    }
  });

  return newPost;
}

export async function editCaption(postId: string, caption: string, userId: string) {
  const edit = await prisma.post.update({
    data: {
      caption
    },
    where: { id: postId, userId }
  });

  return edit;
}

export async function deletePost(postId: string, userId: string) {
  const edit = await prisma.post.delete({
    where: { id: postId, userId }
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      postCount: { decrement: 1 }
    }
  });

  return edit;
}

export async function getPosts(before?: string) {
  const where = { id: before };
  let msg;
  if (!before) msg = await prisma.post.findFirst({ where });
  const posts = await prisma.post.findMany({
    take: 5,
    skip: before ? 1 : 0,
    cursor: { id: before || msg?.id },
  });
  return posts;
}

export async function viewPost(id: string) {
  const where = { id };
  const post = await prisma.post.findFirst({ where });
  return post;
}