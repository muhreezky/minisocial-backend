"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewPost = exports.getPosts = exports.deletePost = exports.editCaption = exports.createPost = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
async function createPost(mediaUrl, caption, userId) {
    const newPost = await prisma_1.default.post.create({
        data: {
            mediaUrl,
            userId,
            caption
        }
    });
    await prisma_1.default.user.update({
        where: { id: userId },
        data: {
            postCount: { increment: 1 }
        }
    });
    return newPost;
}
exports.createPost = createPost;
async function editCaption(postId, caption, userId) {
    const edit = await prisma_1.default.post.update({
        data: {
            caption
        },
        where: { id: postId, userId }
    });
    return edit;
}
exports.editCaption = editCaption;
async function deletePost(postId, userId) {
    const edit = await prisma_1.default.post.delete({
        where: { id: postId, userId }
    });
    await prisma_1.default.user.update({
        where: { id: userId },
        data: {
            postCount: { decrement: 1 }
        }
    });
    return edit;
}
exports.deletePost = deletePost;
async function getPosts(before) {
    const where = { id: before };
    let msg;
    if (!before)
        msg = await prisma_1.default.post.findFirst({ where });
    const posts = await prisma_1.default.post.findMany({
        take: 5,
        skip: before ? 1 : 0,
        cursor: { id: before || msg?.id },
    });
    return posts;
}
exports.getPosts = getPosts;
async function viewPost(id) {
    const where = { id };
    const post = await prisma_1.default.post.findFirst({ where });
    return post;
}
exports.viewPost = viewPost;
//# sourceMappingURL=post.service.js.map