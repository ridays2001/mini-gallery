import { getStore } from '@netlify/blobs';

export async function GET(_req: Request, { params: { id } }: GetRawPostProps) {
	const store = getStore('posts');
	const file = await store.get(id, { type: 'blob' });
	return new Response(file);
}

type GetRawPostProps = {
	params: { id: string };
};
