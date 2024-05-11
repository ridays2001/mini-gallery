'use client';

import { FormWrapper } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { ChatBubbleIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { commentAction } from './actions';

export function CommentButton({ comments, isAuthenticated }: CommentButtonProps) {
	return (
		<Button
			className='gap-2 flex-wrap md:flex-nowrap h-auto'
			variant='ghost'
			onClick={() => {
				if (!isAuthenticated) return toast.error('You need to be logged in to comment.');

				const commentBox = document.querySelector('#comment-box') as HTMLTextAreaElement;
				if (commentBox) commentBox.focus();
			}}
		>
			<ChatBubbleIcon className='w-8 h-8 md:w-10 md:h-10' />
			<span className='text-lg md:text-xl'>{comments}</span>
		</Button>
	);
}

export function CommentBox({ postId }: CommentBoxProps) {
	return (
		<FormWrapper
			action={commentAction}
			className='border border-input rounded-lg focus-within:ring-1 focus-within:ring-ring px-3 py-2 flex items-center'
		>
			<textarea
				name='content'
				id='comment-box'
				className='border-none outline-none bg-transparent w-full'
				placeholder='Write a comment...'
				required
				maxLength={300}
			/>
			<input type='hidden' name='postId' value={postId} />
			<CommentSubmitButton />
		</FormWrapper>
	);
}

function CommentSubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button size='icon' variant='ghost' type='submit' className='w-10 h-10 p-2' disabled={pending}>
			{pending ? (
				<span className='flex items-center'>
					<span className='loader'></span>
				</span>
			) : (
				<PaperPlaneIcon className='w-full h-full' />
			)}
		</Button>
	);
}

type CommentButtonProps = {
	comments: number;
	isAuthenticated: boolean;
};

type CommentBoxProps = {
	postId: string;
};
