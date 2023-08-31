import prisma from '../utils/prisma';

export async function createPost(mediaUrl: string, caption: string, userId: string) {
  const newPost = await prisma.post.create({
    data: {
      mediaUrl,
      userId,
      caption
    }
  });

  return newPost;
}

export async function editCaption(postId: string, caption: string) {
  const edit = await prisma.post.update({
    data: {
      caption
    },
    where: { id: postId }
  });

  return edit;
}