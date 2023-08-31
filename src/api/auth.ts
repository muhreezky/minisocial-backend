import { Router } from 'express';
import { getMe, loginUser, registerUser } from '../controllers/auth.controller';
import { verifyUser } from '../middlewares/auth.middleware';

const authRoute = Router();
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.get('/me', verifyUser, getMe);

export default authRoute;