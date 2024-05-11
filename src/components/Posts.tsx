'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Post } from '@prisma/client';

export function Posts({ posts, className = '' }: PostsProps) {
	const [clientWidth, setClientWidth] = useState(100);

	return (
		<section className={cn('mt-6 grid grid-cols-3 gap-4 pb-6', className)}>
			{posts.length < 0 && <p className='text-center'>No posts yet.</p>}
			{posts.map(post => (
				<Link key={post.id} className='relative' style={{ height: clientWidth }} href={`/posts/${post.id}`}>
					<Image
						src={`/posts/raw/${post.id}`}
						alt={`Post-${post.id}`}
						className='rounded-lg object-cover'
						fill
						placeholder='blur'
						blurDataURL={post.blurUrl}
						key={post.id}
						loading='lazy'
						onLoad={e => setClientWidth(e.currentTarget.clientWidth)}
					/>
				</Link>
			))}
		</section>
	);
}

type PostsProps = {
	posts: Array<Post>;
	className?: string;
};
