import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import authRoute from './auth';
import userRoute from './user';
import postRoute from './post';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/auth', authRoute);
router.use('/u', userRoute);
router.use('/posts', postRoute);

export default router;
