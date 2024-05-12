'use client';

import { FormWrapper, SubmitButton } from '@/components/Form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { setProfileAction } from './actions';

export function EditProfileForm({ username, bio }: EditProfileFormProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button>Edit Profile</Button>
			</DialogTrigger>

			<DialogContent className='w-11/12 sm:max-w-lg'>
				<DialogHeader className='items-center'>
					<DialogTitle className='w-fit'>Edit profile</DialogTitle>
					<DialogDescription>Set up your profile!</DialogDescription>
				</DialogHeader>
				<FormWrapper action={setProfileAction} onSuccess={() => setDialogOpen(false)}>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 sm:items-center gap-4'>
							<Label htmlFor='username' className='sm:text-right'>
								Username
							</Label>
							<Input
								name='username'
								className='col-span-4 sm:col-span-3'
								placeholder='Select a username...'
								defaultValue={username}
								required
							/>
						</div>
						<div className='grid grid-cols-4 sm:items-center gap-4'>
							<Label htmlFor='bio' className='sm:text-right'>
								Bio
							</Label>
							<Textarea
								name='bio'
								className='col-span-4 sm:col-span-3'
								rows={5}
								placeholder='Enter your bio...'
								defaultValue={bio}
								maxLength={300}
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<SubmitButton label='Save' pendingLabel='Saving...' />
					</DialogFooter>
				</FormWrapper>
			</DialogContent>
		</Dialog>
	);
}

type EditProfileFormProps = {
	username?: string;
	bio?: string;
};
