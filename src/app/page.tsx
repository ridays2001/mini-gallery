import { Posts } from '@/components/Posts';
import { getPrisma } from '@/lib/db';

export default async function Home() {
	const prisma = getPrisma();
	const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });

	return (
		<main>
			<h1 className='text-center'>Mini Gallery</h1>
			<Posts posts={posts} className='grid-cols-3 md:grid-cols-4 xl:grid-cols-5' />
		</main>
	);
}
