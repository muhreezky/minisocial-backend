"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewPostAction = exports.getPostsAction = exports.deletePostAction = exports.editCaptionAction = exports.createPostAction = void 0;
const post_service_1 = require("../services/post.service");
async function createPostAction(req, res) {
    try {
        const token = req.token;
        if (!token.id)
            return res.status(403).json({ message: 'Anda tidak diizinkan memposting' });
        const { url, caption = '' } = req.body;
        const post = await (0, post_service_1.createPost)(url, caption, token.id);
        return res.status(201).json({ message: 'Postingan berhasil dikirim', data: { post } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.createPostAction = createPostAction;
async function editCaptionAction(req, res) {
    try {
        const token = req.token;
        const { caption } = req.body;
        const { postId } = req.params;
        const post = await (0, post_service_1.editCaption)(postId, caption, token.id);
        return res.status(200).json({ message: 'Caption postingan berhasil diedit', data: { post } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.editCaptionAction = editCaptionAction;
async function deletePostAction(req, res) {
    try {
        const token = req.token;
        const { postId } = req.params;
        const deletedPost = await (0, post_service_1.deletePost)(postId, token.id);
        return res.status(200).json({ message: 'Postingan berhasil dihapus', data: { deletedPost } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.deletePostAction = deletePostAction;
async function getPostsAction(req, res) {
    try {
        const { before } = req.query;
        const posts = await (0, post_service_1.getPosts)(before);
        return res.status(200).json({ message: 'Beberapa postingan telah muncul', data: { posts } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.getPostsAction = getPostsAction;
async function viewPostAction(req, res) {
    try {
        const { postId } = req.params;
        const post = await (0, post_service_1.viewPost)(postId);
        return res.status(200).json({ message: 'Postingan berhasil dimunculkan', data: { post } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.viewPostAction = viewPostAction;
//# sourceMappingURL=post.controller.js.map