import { Request, Response } from 'express';
import { login, newAccount } from '../services/auth.service';

export async function registerUser (req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;
    const user = await newAccount(email, username, password);
    return res.status(201).json({ message: 'Akun berhasil dibuat', data: { user } });
  } catch (e: unknown) {
    return res.status(500).json({ message: 'Kesalahan Internal pada Halaman', error: e });
  }
}

export async function loginUser (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    return res.status(200).json({ message: 'Login berhasil', data: { user } });
  } catch (e: unknown) {
    return res.status(500).json({ message: 'Kesalahan Internal pada Halaman', error: e });
  }
}