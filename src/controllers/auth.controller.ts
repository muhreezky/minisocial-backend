import { Request, Response } from 'express';
import { getUserData, login, newAccount } from '../services/auth.service';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { CustomRequest } from '../types/cusrequest';

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;
    const user = await newAccount(email, username, password);
    if (!user)
      return res.status(400).json({
        status: 400,
        message: 'Username atau E-mail sudah ada',
        data: null,
      });
    return res
      .status(201)
      .json({ message: 'Akun berhasil dibuat', data: { user } });
  } catch (e: any) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    const token = jwt.sign(
      { id: user?.id, username: user?.username },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '7 days',
      }
    );
    return res.status(200).json({
      message: 'Login berhasil',
      data: {
        username: user?.username,
        token,
      },
    });
  } catch (e: any) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const user = await getUserData((req as CustomRequest).token as string);
    console.log(user);
    if (!user)
      return res.status(404).json({ message: 'User tidak ada', data: null });
    return res.status(200).json({ message: 'User ditemukan', data: { user } });
  } catch (e: any) {
    return res.status(500).json({ message: e.message, error: e });
  }
}
