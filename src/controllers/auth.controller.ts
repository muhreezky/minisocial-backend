import { login, newAccount, changeUsername as changeUname, changeBioText } from '../services/auth.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
// import { Customany } from '../types/cusany';
import { deleteAccount, getUserById } from '../services/user.service';

export const alphaNumOnly: RegExp = /[^a-z0-9._]/i;

export async function registerUser(req: any, res: any) {
  try {
    const { email, username, password } = req.body;
    if (alphaNumOnly.test(username))
      return res.status(400).json({ status: 404, message: 'Username hanya boleh huruf, angka, atau simbol . dan _', data: null });
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

export async function loginUser(req: any, res: any) {
  try {
    const { email, password } = req.body;
    console.log('Data', req.body);
    const user = await login(email, password);
    console.log('User : ', user);
    if (!user) return res.status(400).json({ message: 'Login gagal, cek kembali data anda', data: null });
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

export async function getMe(req: any, res: any) {
  try {
    const token = req.token as JwtPayload;
    const user = await getUserById(token.id);
    if (!user)
      return res.status(404).json({ message: 'User tidak ada', data: null });
    return res.status(200).json({ message: 'User ditemukan', data: { user } });
  } catch (e: any) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

export async function changeUsername(req: any, res: any) {
  try {
    const token = req.token as JwtPayload;
    const { username } = req.body;
    if (alphaNumOnly.test(username)) 
      return res.status(400).json({ status: 400, message: 'Username tidak boleh pakai simbol selain . dan _', data: null });
    const user = await changeUname(token.id, username);
    if (!user) return res.status(400).json({ status: 400, message: 'Username sudah ada', data: null });
    return res.status(200).json({ status: 200, message: 'Username berhasil diubah', data: { user } });
  } catch (e: any) {
    return res.status(500).json({ status: 500, message: e.message, error: e });
  }
}

export async function changeBio(req: any, res: any) {
  try {
    const token = req.token as JwtPayload;
    const { biotext } = req.body;
    const user = await changeBioText(token.id, biotext);
    if (!user) return res.status(404).json({ status: 404, message: 'User tidak ada', data: null });
    return res.status(200).json({ status: 200, message: 'Bio Text telah diubah', data: { user } });
  } catch (e: any) {
    return res.status(500).json({ status: 500, message: e.message, error: e });
  }
}

export async function deleteUser(req: any, res: any) {
  try {
    const token = req.token as JwtPayload;
    if (!token.id) return res.status(401).json({ status: 401, message: 'Anda harus login dulu', data: null });
    const user = await deleteAccount(token.id);
    if (!user) return res.status(404).json({ status: 404, message: 'User tidak ditemukan', data: null });
    return res.status(200).json({ status: 200, message: 'Akun berhasil dihapus', data: { user } });
  } catch (e: any) {
    return res.status(500).json({ status: 500, message: e.message, error: e });
  }
}