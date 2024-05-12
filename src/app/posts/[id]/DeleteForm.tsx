'use client';

import { FormWrapper, SubmitButton } from '@/components/Form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { deletePostAction } from './actions';

export function DeleteForm({ postId }: DeleteFormProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon' className='text-destructive hover:bg-destructive/35'>
					<TrashIcon className='w-6 h-6' />
				</Button>
			</DialogTrigger>

			<DialogContent className='w-11/12 sm:max-w-lg'>
				<DialogHeader className='items-center'>
					<DialogTitle className='w-fit'>Delete post</DialogTitle>
					<DialogDescription>Are you sure you want to delete this post?</DialogDescription>
				</DialogHeader>
				<FormWrapper action={deletePostAction} onSuccess={() => setDialogOpen(false)}>
					<input type='hidden' name='postId' value={postId} />
					<div className='grid gap-4 py-4'>
						<SubmitButton label='Delete' pendingLabel='Deleting...' />
					</div>
				</FormWrapper>
			</DialogContent>
		</Dialog>
	);
}

export type DeleteFormProps = {
	postId: string;
};
