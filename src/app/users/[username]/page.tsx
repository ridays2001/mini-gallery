import { UserProfile } from '@/components/UserProfile';
import { getPrisma, getUser } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function UserProfilePage({ params: { username } }: UserProfilePageProps) {
	const prisma = getPrisma();
	const sessionUser = await getUser();
	const user = await prisma.user.findUnique({ where: { username }, include: { posts: true } });

	if (!user) notFound();

	return <UserProfile user={user} isSelf={sessionUser?.id === user.id} />;
}

export const generateMetadata = async ({ params: { username } }: UserProfilePageProps) => {
	const prisma = getPrisma();
	const user = await prisma.user.findUnique({ where: { username } });

	if (!user) return { title: 'User Not Found | Mini Gallery' };

	return {
		title: `${user.name} | Mini Gallery`,
		description: user.bio
	};
};

type UserProfilePageProps = {
	params: { username: string };
};
