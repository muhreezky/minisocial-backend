import jwt, { JwtPayload } from 'jsonwebtoken';

const message = 'Maaf anda tidak diizinkan untuk masuk';

export function verifyUser (req: any, res: any, next: any) {
	try {
		const bearer = req.headers.authorization;
		if (!bearer) return res.status(401).json({ message });
		const token = bearer.split(' ')[1];
		if (!token) return res.status(401).json({ message });
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
		req.token = decoded as JwtPayload;
		next();
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}