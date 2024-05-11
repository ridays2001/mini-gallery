'use server';

import { getPrisma, getUser } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

import type { ServerActionState } from '@/lib/types';

export async function likeAction(postId: string) {
	const prisma = getPrisma();
	await prisma.post.update({
		where: { id: postId },
		data: { likes: { increment: 1 } }
	});

	revalidatePath(`/posts/${postId}`);
	return { success: true, message: 'Post liked!' };
}

export async function commentAction(_prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
	const data = {
		content: formData.get('content') as string,
		postId: formData.get('postId') as string
	};

	if (!data.content?.length) return { error: true, message: 'Comment cannot be empty!' };
	if (data.content.length > 300) return { error: true, message: 'Comment must not be more than 300 characters!' };

	const user = await getUser();
	if (!user) return { error: true, message: 'You must be logged in to comment!' };

	const prisma = getPrisma();
	await prisma.comment.create({
		data: {
			id: generateId(),
			content: data.content,
			Post: { connect: { id: data.postId } },
			author: { connect: { id: user.id } }
		}
	});

	revalidatePath(`/posts/${data.postId}`);

	return { success: true, message: 'Comment added!' };
}
