import { response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

function unauthed () {
	return response.status(401).json({ message: 'Maaf, anda tidak boleh masuk' });
}

export function verifyUser (req: any, res: any, next: any) {
	try {
		const bearer = req.headers.authorization;
		if (!bearer) return unauthed();
		const token = bearer.split(' ')[1];
		if (!token) return unauthed();
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
		req.token = decoded as JwtPayload;
		next();
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}