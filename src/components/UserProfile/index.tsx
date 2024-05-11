import { Posts } from '@/components/Posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Post, User } from '@prisma/client';
import { PersonIcon } from '@radix-ui/react-icons';
import { EditProfileForm } from './EditProfileForm';

export function UserProfile({ user, isSelf = false }: UserProfileProps) {
	const posts = user.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return (
		<article className='max-w-prose mx-auto'>
			<section className='flex gap-8 border-b-2 pb-8'>
				<section>
					<Avatar className='w-32 h-32'>
						<AvatarImage src={user.picture} alt='Profile Picture' />
						<AvatarFallback>
							<PersonIcon />
						</AvatarFallback>
					</Avatar>
				</section>

				<section>
					<h2 className='w-fit'>{user.name}</h2>
					<p>{user.username ? `@${user.username}` : 'No username set.'}</p>
					<p className='mb-4'>{user.bio ?? 'No bio set.'}</p>

					{isSelf && <EditProfileForm username={user.username} bio={user.bio} />}
				</section>
			</section>

			<Posts posts={posts} />
		</article>
	);
}

type UserProfileProps = {
	user: User & { posts: Array<Post>; picture: string };
	isSelf?: boolean;
};