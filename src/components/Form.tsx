import type { ServerActionState } from '@/lib/types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { Button } from './ui/button';

export function FormWrapper({ action, children, onSuccess, className = '' }: FormWrapperProps) {
	const [state, formAction] = useFormState(action, {});

	useEffect(() => {
		if (state.success) {
			toast.success(state.message ?? 'Form submitted successfully!');
			if (onSuccess) onSuccess();
		}
		if (state.error) {
			toast.error(state.message ?? 'Failed to submit form.');
		}
	}, [state]);

	return (
		<form className={className} action={formAction}>
			{children}
		</form>
	);
}

export function SubmitButton({ label = 'Submit', pendingLabel = 'Submitting...' }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button type='submit' disabled={pending}>
			{pending && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
			{pending ? pendingLabel : label}
		</Button>
	);
}

type FormWrapperProps = {
	action: (_prevState: ServerActionState, formData: FormData) => Promise<ServerActionState>;
	children: React.ReactNode;
	onSuccess?: () => void;
	className?: string;
};

type SubmitButtonProps = {
	label?: string;
	pendingLabel?: string;
};
