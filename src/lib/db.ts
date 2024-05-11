import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { cache } from 'react';

function getPrismaClient() {
	const prisma = new PrismaClient();
	return prisma;
}

export const getPrisma = cache(getPrismaClient);

export async function getUser(required = false) {
	const { getUser: getKindeUser } = getKindeServerSession();
	const kindeUser = await getKindeUser();
	if (required && !kindeUser) redirect('/api/auth/login');

	const prisma = getPrisma();
	const user = await prisma.user.findUnique({ where: { id: kindeUser?.id }, include: { posts: true } });
	if (!user) {
		await prisma.user.create({
			data: {
				id: kindeUser.id,
				name: `${kindeUser.given_name} ${kindeUser.family_name}`,
				picture: kindeUser.picture
			}
		});
	}

	return {
		id: kindeUser.id,
		name: user?.name ?? `${kindeUser.given_name} ${kindeUser.family_name}`,
		picture: kindeUser.picture,
		...user
	};
}
