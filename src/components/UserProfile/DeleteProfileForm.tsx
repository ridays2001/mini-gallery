'use client';

import { FormWrapper, SubmitButton } from '../Form';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog';
import { deleteProfileAction } from './actions';

export function DeleteProfileForm() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='text-destructive hover:bg-destructive/35'>
					Delete Profile
				</Button>
			</DialogTrigger>

			<DialogContent className='w-11/12 sm:max-w-lg'>
				<DialogHeader className='items-center'>
					<DialogTitle className='w-fit'>Delete Profile</DialogTitle>
					<DialogDescription>
						Are you absolutely sure that you wish to delete your profile? This will also delete all your
						posts and comments!
					</DialogDescription>
				</DialogHeader>
				<FormWrapper action={deleteProfileAction}>
					<DialogFooter>
						<SubmitButton label='Save' pendingLabel='Saving...' />
					</DialogFooter>
				</FormWrapper>
			</DialogContent>
		</Dialog>
	);
}
