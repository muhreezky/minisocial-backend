"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const postRoute = (0, express_1.Router)();
postRoute.post('/', auth_middleware_1.verifyUser, post_controller_1.createPostAction);
postRoute.put('/:postId', auth_middleware_1.verifyUser, post_controller_1.editCaptionAction);
postRoute.get('/:postId', auth_middleware_1.verifyUser, post_controller_1.viewPostAction);
postRoute.delete('/:postId', auth_middleware_1.verifyUser, post_controller_1.deletePostAction);
postRoute.get('/', auth_middleware_1.verifyUser, post_controller_1.getPostsAction);
exports.default = postRoute;
//# sourceMappingURL=post.js.map