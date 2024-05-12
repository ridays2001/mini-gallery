'use client';

import { cn } from '@/lib/utils';
import { UploadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Input } from './ui/input';

export function FileUpload({ className }: FileUploadProps) {
	const [file, setFile] = useState<File | null>(null);
	const [imageProperties, setImageProperties] = useState<{ width: number; height: number; blurUrl: string }>(null);

	// Prevent memory leaks. Ref: https://react-dropzone.js.org/#section-previews
	useEffect(() => {
		if (typeof document !== 'undefined' && file) {
			// We cannot programmatically set the file input value, so we need to append the file to the FormData event.
			document.querySelector('form').addEventListener('formdata', e => {
				e?.formData?.append('image', file);
			});
		}

		// @ts-expect-error
		return () => file && URL.revokeObjectURL(file?.preview);
	}, [file]);

	const { getInputProps, getRootProps, open } = useDropzone({
		accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/webp': ['.webp'] },
		maxFiles: 1,
		maxSize: 2 * 1024 * 1024,
		onDropAccepted: acceptedFiles => {
			if (!acceptedFiles.length) return null;
			setFile(Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }));

			// Generate a 10 x 10 px placeholder image for the image.
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const image = new Image();
			image.src = URL.createObjectURL(acceptedFiles[0]);
			image.onload = () => {
				// The size of the placeholder image.
				const size = 10;

				canvas.width = size;
				canvas.height = size;

				ctx?.drawImage(image, 0, 0, size, size);

				// Convert the canvas to a blob and then to a base64 string.
				canvas.toBlob(
					blob => {
						const reader = new FileReader();
						reader.readAsDataURL(blob as Blob);
						reader.onloadend = () => {
							setImageProperties({
								width: image.width,
								height: image.height,
								blurUrl: reader.result as string
							});
						};
					},
					'image/jpeg',
					0.1
				);
			};
		},
		onDropRejected: () => {
			toast.error('Invalid file type or file size. Please upload a valid image file under 2MB.');
		}
	});

	return (
		<div className={cn('flex flex-col items-center', className)}>
			<div className='w-full'>
				{file ? (
					// @ts-expect-error
					<img src={file?.preview} alt='Preview' className='mt-4 rounded-lg w-full' onClick={open} />
				) : (
					<label
						{...getRootProps()}
						className='flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-lg'
					>
						<div className=' text-center'>
							<div className='border p-2 rounded-md max-w-min mx-auto'>
								<UploadIcon className='w-8 h-8' />
							</div>

							<h4 className='mt-4'>Upload Image</h4>
							<p className='text-xs'>(Must be under 2MB)</p>
						</div>
					</label>
				)}

				<Input {...getInputProps()} accept='image/png, image/jpeg, image/webp' type='file' className='hidden' />

				{/* Inject the properties as hidden inputs. */}
				<input type='hidden' name='blurUrl' value={imageProperties?.blurUrl} />
				<input type='hidden' name='width' value={imageProperties?.width} />
				<input type='hidden' name='height' value={imageProperties?.height} />
			</div>
		</div>
	);
}

type FileUploadProps = {
	className?: string;
};
