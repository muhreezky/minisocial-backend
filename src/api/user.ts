import { getUserByUsername } from '../controllers/user.controller';
import { Router } from 'express';

const userRoute = Router();
userRoute.get('/:username', getUserByUsername);

export default userRoute;