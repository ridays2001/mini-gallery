import { NewPostForm } from './NewPostForm';

export default function NewPostPage() {
	return (
		<article className='max-w-prose mx-auto'>
			<h1 className='text-center'>Create a New Post</h1>
			<NewPostForm />
		</article>
	);
}
