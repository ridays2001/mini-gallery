import { getStore } from '@netlify/blobs';

export async function GET(_req: Request, { params: { id } }: GetRawPostProps) {
	const store = getStore('posts');
	const { data, metadata } = await store.getWithMetadata(id, { type: 'blob' });
	if (!data) return new Response('Not found', { status: 404 });

	return new Response(data, {
		headers: {
			'Netlify-CDN-Cache-Control': 'public, s-maxage=31536000, must-revalidate',
			'Netlify-Cache-Tag': [id, metadata.authorId ?? ''].join(',')
		}
	});
}

type GetRawPostProps = {
	params: { id: string };
};
