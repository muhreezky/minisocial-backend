import { Request, Response } from 'express';
import { createPost, deletePost, editCaption, getPosts, viewPost } from '../services/post.service';
import { CustomRequest } from '../types/cusrequest';
import { JwtPayload } from 'jsonwebtoken';

export async function createPostAction(req: Request, res: Response) {
	try {
		const token = (req as CustomRequest).token as JwtPayload;
		if (!token.id) return res.status(403).json({ message: 'Anda tidak diizinkan memposting' });
		const { url, caption = '' } = req.body;
		const post = await createPost(url, caption, token.id);
		return res.status(201).json({ message: 'Postingan berhasil dikirim', data: { post } });
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}

export async function editCaptionAction(req: Request, res: Response) {
	try {
		const token = (req as CustomRequest).token as JwtPayload;
		const { caption } = req.body;
		const { postId } = req.params;
		const post = await editCaption(postId, caption, token.id);
		return res.status(200).json({ message: 'Caption postingan berhasil diedit', data: { post } });
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}

export async function deletePostAction(req: Request, res: Response) {
	try {
		const token = (req as CustomRequest).token as JwtPayload;
		const { postId } = req.params;
		const deletedPost = await deletePost(postId, token.id);
		return res.status(200).json({ message: 'Postingan berhasil dihapus', data: { deletedPost } });
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}

export async function getPostsAction(req: Request, res: Response) {
	try {
		const { before } = req.query;
		const posts = await getPosts(before as string);
		return res.status(200).json({ message: 'Beberapa postingan telah muncul', data: { posts } });
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}

export async function viewPostAction(req: Request, res: Response) {
	try {
		const { postId } = req.params;
		const post = await viewPost(postId);
		return res.status(200).json({ message: 'Postingan berhasil dimunculkan', data: { post } });
	} catch (e: any) {
		return res.status(500).json({ message: e.message, error: e });
	}
}