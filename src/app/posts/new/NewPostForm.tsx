'use client';

import { FileUpload } from '@/components/FileUpload';
import { FormWrapper, SubmitButton } from '@/components/Form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPostAction } from './action';

export function NewPostForm() {
	return (
		<FormWrapper action={createPostAction} className='flex flex-col gap-6 mt-8'>
			<div className='grid grid-cols-4 gap-4 md:items-center'>
				<Label htmlFor='title'>Title</Label>
				<Input name='title' className='col-span-4 md:col-span-3' required />
			</div>

			<div className='grid grid-cols-4 gap-4'>
				<Label className='mt-2'>Image</Label>
				<FileUpload className='col-span-4 md:col-span-3' />
			</div>

			<SubmitButton label='Create Post' pendingLabel='Creating Post...' />
		</FormWrapper>
	);
}
