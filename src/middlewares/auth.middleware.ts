import { NextFunction, Request, Response, response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

function unauthed () {
	return response.status(401).json({ message: 'Maaf, anda tidak boleh masuk' });
}

export type CustomRequest = Request & {
	token: string | JwtPayload;
};

export function verifyUser (req: Request, res: Response, next: NextFunction) {
	try {
		const bearer = req.headers.authorization;
		if (!bearer) return unauthed();
		const token = bearer.split(' ')[1];
		if (!token) return unauthed();
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
		(req as CustomRequest).token = decoded as JwtPayload;
		console.log(decoded);
		next();
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}