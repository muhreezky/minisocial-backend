import { Router } from 'express';
import { changeBio, changeUsername, getMe, loginUser, registerUser } from '../controllers/auth.controller';
import { verifyUser } from '../middlewares/auth.middleware';
import { deleteUserAccount } from '../controllers/user.controller';

const authRoute = Router();
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.get('/me', verifyUser, getMe);
authRoute.delete('/me', verifyUser, deleteUserAccount);
authRoute.put('/me/username', verifyUser, changeUsername);
authRoute.put('/me/bio', verifyUser, changeBio);

export default authRoute;