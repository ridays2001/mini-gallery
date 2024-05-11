import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getPrisma } from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PersonIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { CommentBox, CommentButton } from './Comments';
import { LikeButton } from './LikeButton';

export default async function PostPage({ params: { id } }: PostPageProps) {
	const prisma = getPrisma();
	const post = await prisma.post.findUnique({
		where: { id },
		include: { author: true, comments: { include: { author: true } } }
	});

	const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
	const isAuthenticated = await getIsAuthenticated();

	return (
		<article className='max-w-prose mx-auto flex flex-col gap-6'>
			<h1 className='text-center'>{post.title}</h1>
			<Image
				alt={post.title}
				src={`/posts/raw/${post.id}`}
				width={post.width}
				height={post.height}
				placeholder='blur'
				blurDataURL={post.blurUrl}
				className='rounded-lg'
			/>

			<div className='flex items-center gap-4'>
				<Avatar className='w-12 h-12'>
					<AvatarImage src={post.author?.picture} alt='Profile Picture' />
					<AvatarFallback>
						<PersonIcon />
					</AvatarFallback>
				</Avatar>
				<div>
					<p className='text-lg md:text-xl font-heading'>{post.author?.name}</p>
					<p>{post.author?.username ? `@${post.author?.username}` : 'No username set.'}</p>
				</div>
				<div className='ms-auto flex items-center'>
					<LikeButton likes={post.likes} postId={post.id} />
					<CommentButton comments={post.comments.length} isAuthenticated={isAuthenticated} />
				</div>
			</div>

			<Separator />

			<section className='flex flex-col gap-4 pb-4'>
				{post.comments.map(comment => (
					<div key={comment.id} className='flex gap-4'>
						<Avatar className='w-12 h-12'>
							<AvatarImage src={comment.author.picture} alt='Profile Picture' />
							<AvatarFallback>
								<PersonIcon />
							</AvatarFallback>
						</Avatar>
						<div>
							<p className='text-lg md:text-xl font-heading'>{comment.author.name}</p>
							<p>{comment.content}</p>
						</div>
					</div>
				))}

				{isAuthenticated && <CommentBox postId={post.id} />}
			</section>
		</article>
	);
}

type PostPageProps = {
	params: { id: string };
};
