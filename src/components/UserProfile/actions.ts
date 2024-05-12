'use server';

import { getPrisma, getUser } from '@/lib/db';
import { purgeCache } from '@netlify/functions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { ServerActionState } from '@/lib/types';

export async function setProfileAction(_prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
	const user = await getUser();
	if (!user) return { error: true, message: 'You must be logged in to do this!' };

	const data = {
		username: formData.get('username') as string,
		bio: formData.get('bio') as string
	};

	if (data.bio.length > 300) return { error: true, message: 'Bio must not be more than 300 characters!' };

	const prisma = getPrisma();
	if (data.username !== user.username) {
		const existingUser = await prisma.user.findUnique({ where: { username: data.username } });
		if (existingUser) return { error: true, message: 'Username already taken!' };
	}

	await prisma.user.update({ where: { id: user.id }, data: { bio: data.bio, username: data.username } });

	revalidatePath('/profile');

	return { success: true, message: 'Profile updated successfully!' };
}

export async function deleteProfileAction(
	_prevState: ServerActionState,
	_formData: FormData
): Promise<ServerActionState> {
	const user = await getUser();
	if (!user) return { error: true, message: 'You must be logged in to delete your profile!' };

	const prisma = getPrisma();
	await prisma.user.delete({ where: { id: user.id } });

	// Also delete the user from Kinde auth. I am skipping this step for now.

	await purgeCache({
		tags: [user.id]
	});

	revalidatePath('/');
	redirect('/api/auth/logout');
}
