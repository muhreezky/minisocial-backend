import { JwtPayload } from 'jsonwebtoken';
import { getByUsername, deleteAccount, getUserById as getFromId } from '../services/user.service';

export async function getUserByUsername(req: any, res: any) {
	const { username } = req.params;
	const user = await getByUsername(username);
	if (!user)
		return res.status(404).json({ message: 'User tidak ditemukan', data: null });
	return res.status(200).json({ 
		message: 'User ditemukan', 
		data: { user } 
	});
}

export async function deleteUserAccount(req: any, res: any) {
	const token = req.token as JwtPayload;
	if(!token.id) return res.status(403).json({ message: 'Anda tidak boleh menghapus akun tanpa izin', status: 403, data: null });
	const account = await deleteAccount(token.id);
	return res.status(200).json({ message: 'Akun anda sudah dihapus', status: 200, data: { account } });
}

export async function getUserById(req: any, res: any) {
	const { id } = req.params;
	const user = await getFromId(id);
	if(!user) return res.status(404).json({ status: 404, message: 'User tidak ditemukan', data: null });
	return res.status(200).json({
		message: 'User ditemukan',
		data: { user }
	})
}