import { getByUsername } from '../services/user.service';
import { Request, Response } from 'express';

export async function getUserByUsername(req: Request, res: Response) {
	const { username } = req.params;
	const user = await getByUsername(username);
	if (!user)
		return res.status(404).json({ message: 'User tidak ditemukan', data: null });
	return res.status(200).json({ 
		message: 'User ditemukan', 
		data: { user } 
	});
}