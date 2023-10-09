import { getPostsByUsername } from '../controllers/post.controller';
import { getUserById, getUserByUsername } from '../controllers/user.controller';
import { Router } from 'express';

const userRoute = Router();
userRoute.get('/:username', getUserByUsername);
userRoute.get('/:username/posts', getPostsByUsername);
userRoute.get('/id/:id', getUserById);

export default userRoute;