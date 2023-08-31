import { Router } from 'express';
import { getMe, loginUser, registerUser } from '../controllers/auth.controller';

const authRoute = Router();
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.get('/me', getMe);

export default authRoute;