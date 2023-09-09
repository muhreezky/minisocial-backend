"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.postComment = exports.getComments = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
async function getComments(postId, before) {
    let msg;
    if (!before)
        msg = await prisma_1.default.post.findFirst({
            where: { id: before },
        });
    const comments = await prisma_1.default.comment.findMany({
        take: 5,
        where: { postId },
        cursor: { id: before || msg?.id },
    });
    return comments;
}
exports.getComments = getComments;
async function postComment(postId, text, userId) {
    const comment = await prisma_1.default.comment.create({
        data: { postId, text, userId }
    });
    return comment;
}
exports.postComment = postComment;
async function deleteComment(commentId, userId) {
    const deletedComment = await prisma_1.default.comment.delete({
        where: { id: commentId, userId }
    });
    return deletedComment;
}
exports.deleteComment = deleteComment;
//# sourceMappingURL=comment.service.js.map