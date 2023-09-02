import { Router } from 'express';

const userRoute = Router();
userRoute.get('/:username');

export default userRoute;