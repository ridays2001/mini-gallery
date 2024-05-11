'use client';

import { Button } from '@/components/ui/button';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useOptimistic, useTransition } from 'react';
import { likeAction } from './actions';

export function LikeButton({ likes, postId }: LikeButtonProps) {
	const [isPending, startTransition] = useTransition();
	const [optimisticLikes, addOptimisticLikes] = useOptimistic<number, void>(likes, currentLikes => currentLikes + 1);

	return (
		<Button
			variant='ghost'
			className='h-auto p-2 gap-2 flex-wrap md:flex-nowrap'
			onClick={async () => {
				startTransition(async () => {
					addOptimisticLikes();
					await likeAction(postId);
				});
			}}
			disabled={isPending}
		>
			{isPending && (
				<span className='flex items-center'>
					<span className='loader' />
				</span>
			)}
			{optimisticLikes > 0 ? (
				<HeartFilledIcon className='w-8 h-8 md:w-10 md:h-10 text-primary' />
			) : (
				<HeartIcon className='w-8 h-8 md:w-10 md:h-10 text-primary' />
			)}

			<span className='text-lg md:text-xl'>{optimisticLikes}</span>
		</Button>
	);
}

type LikeButtonProps = {
	likes: number;
	postId: string;
};
