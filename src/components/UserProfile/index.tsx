import { Posts } from '@/components/Posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PersonIcon } from '@radix-ui/react-icons';
import { DeleteProfileForm } from './DeleteProfileForm';
import { EditProfileForm } from './EditProfileForm';

import type { Post, User } from '@prisma/client';

export function UserProfile({ user, isSelf = false }: UserProfileProps) {
	const posts = (user.posts ?? []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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

					{isSelf && (
						<div className='flex gap-4'>
							<EditProfileForm username={user.username} bio={user.bio} />
							<DeleteProfileForm />
						</div>
					)}
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
