import { Router } from 'express';
import { createPostAction, deletePostAction, editCaptionAction, viewPostAction, getPostsAction } from '../controllers/post.controller';
import { verifyUser } from '../middlewares/auth.middleware';

const postRoute = Router();

postRoute.post('/', verifyUser, createPostAction);
postRoute.put('/:postId', verifyUser, editCaptionAction);
postRoute.get('/:postId', verifyUser, viewPostAction);
postRoute.delete('/:postId', verifyUser, deletePostAction);
postRoute.get('/', verifyUser, getPostsAction);

export default postRoute;