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

type UserProfilePageProps = {
	params: { username: string };
};
