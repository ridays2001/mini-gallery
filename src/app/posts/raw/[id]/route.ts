import { getStore } from '@netlify/blobs';

export async function GET(_req: Request, { params: { id } }: GetRawPostProps) {
	const store = getStore('posts');
	const file = await store.get(id, { type: 'blob' });

	if (!file) return new Response('Not found', { status: 404 });

	return new Response(file);
}

type GetRawPostProps = {
	params: { id: string };
};
