'use server';

import { getPrisma, getUser } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { getStore } from '@netlify/blobs';
import { revalidatePath } from 'next/cache';

import type { ServerActionState } from '@/lib/types';

export async function createPostAction(_prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
	const user = await getUser();
	if (!user) return { error: true, message: 'You must be logged in to create a new post!' };

	const data = {
		title: formData.get('title') as string,
		image: formData.get('image') as File,
		blurUrl: formData.get('blurUrl') as string,
		width: parseInt(formData.get('width') as string, 10),
		height: parseInt(formData.get('height') as string, 10)
	};

	// Basic validation. Don't do this in production. Use a library like Yup or Zod.
	if (!data.title?.length || !data.image || !data.blurUrl || !data.width || !data.height) {
		return { error: true, message: 'All fields are required!' };
	}

	const store = getStore('posts');
	const id = generateId();

	// Save the image in the store.
	await store.set(id, data.image);

	const prisma = getPrisma();
	await prisma.post.create({
		data: {
			id,
			title: data.title,
			blurUrl: data.blurUrl,
			height: data.height,
			width: data.width,
			likes: 0,
			author: {
				connect: { id: user.id }
			}
		}
	});

	// Revalidate the paths to update the page content.
	revalidatePath('/profile');
	revalidatePath('/');

	return { success: true, message: 'Post created successfully!' };
}
