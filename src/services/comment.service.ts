import prisma from '../utils/prisma';

export async function getComments(postId: string, before?: string) {
  let msg;
  if (!before)
    msg = await prisma.post.findFirst({
      where: { id: before },
    });
  const comments = await prisma.comment.findMany({
    take: 5,
    where: { postId },
    cursor: { id: before || msg?.id },
  });
  return comments;
}

export async function postComment(postId: string, text: string) {
  const comment = await prisma.comment.create({
    data: {
      postId,
      text
    }
  });
  return comment;
}