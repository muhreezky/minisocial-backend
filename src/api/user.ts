import { getPostsByUsername } from '../controllers/post.controller';
import { getUserByUsername } from '../controllers/user.controller';
import { Router } from 'express';

const userRoute = Router();
userRoute.get('/:username', getUserByUsername);
userRoute.get('/:username/posts', getPostsByUsername);

export default userRoute;