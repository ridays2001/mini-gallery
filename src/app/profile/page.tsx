import { UserProfile } from '@/components/UserProfile';
import { getUser } from '@/lib/db';

export default async function ProfilePage() {
	const user = await getUser(true);

	return <UserProfile user={user} isSelf />;
}
