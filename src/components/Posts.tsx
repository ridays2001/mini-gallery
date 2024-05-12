'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { Post } from '@prisma/client';

export function Posts({ posts, className = '' }: PostsProps) {
	const [clientWidth, setClientWidth] = useState(DEFAULT_WIDTH);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sectionRef?.current) return null;

		const setWidth = () => setClientWidth(sectionRef.current.querySelector('img')?.clientWidth ?? DEFAULT_WIDTH);

		// Run on first render.
		setWidth();

		// Run whenever the window is resized.
		if (typeof window !== 'undefined') window.addEventListener('resize', setWidth);

		return () => {
			// Cleanup.
			if (typeof window !== 'undefined') window.removeEventListener('resize', setWidth);
		};
	}, [sectionRef]);

	return (
		<section className={cn('mt-6 grid grid-cols-3 gap-4 pb-6', className)} ref={sectionRef}>
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

const DEFAULT_WIDTH = 100;
