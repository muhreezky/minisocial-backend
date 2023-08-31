import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

type CustomRequest = Request & {
	token: string | JwtPayload;
};