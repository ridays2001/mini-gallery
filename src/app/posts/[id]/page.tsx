import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getPrisma } from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PersonIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CommentBox, CommentButton } from './Comments';
import { DeletePostForm } from './DeletePostForm';
import { LikeButton } from './LikeButton';

export default async function PostPage({ params: { id } }: PostPageProps) {
	const prisma = getPrisma();
	const post = await prisma.post.findUnique({
		where: { id },
		include: { author: true, comments: { include: { author: true } } }
	});

	if (!post) notFound();

	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();
	const isAuthenticated = !!kindeUser;

	return (
		<article className='max-w-prose mx-auto flex flex-col gap-6'>
			<div className='flex items-center'>
				<h1 className='mx-auto'>{post.title}</h1>
				{kindeUser?.id === post.author.id && <DeletePostForm postId={post.id} />}
			</div>
			<Image
				alt={post.title}
				src={`/posts/raw/${post.id}`}
				width={post.width}
				height={post.height}
				placeholder='blur'
				blurDataURL={post.blurUrl}
				className='rounded-lg'
			/>

			<div className='flex items-center'>
				<Link href={`/users/${post.author.username}`} passHref className='flex items-center gap-4'>
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
				</Link>
				<div className='ms-auto flex items-center'>
					<LikeButton likes={post.likes} postId={post.id} />
					<CommentButton comments={post.comments.length} isAuthenticated={isAuthenticated} />
				</div>
			</div>

			<Separator />

			<section className='flex flex-col gap-4 pb-4'>
				{post.comments.map(comment => (
					<div key={comment.id} className='flex gap-4'>
						<Link href={`/users/${comment.author.username}`}>
							<Avatar className='w-12 h-12'>
								<AvatarImage src={comment.author.picture} alt='Profile Picture' />
								<AvatarFallback>
									<PersonIcon />
								</AvatarFallback>
							</Avatar>
						</Link>
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

export const generateMetadata = async ({ params: { id } }: PostPageProps) => {
	const prisma = getPrisma();
	const post = await prisma.post.findUnique({ where: { id } });

	if (!post) return { title: 'Post Not Found | Mini Gallery' };

	return {
		title: `${post.title} | Mini Gallery`,
		metadataBase: new URL(process.env.SITE_URL),
		openGraph: {
			title: post.title,
			images: [{ url: `/posts/raw/${post.id}` }]
		}
	};
};

type PostPageProps = {
	params: { id: string };
};
