import { json } from '@sveltejs/kit';
import { graphql } from 'graphql';
import schema from '$lib/graphql/schema';

export async function POST(post: { request: Response }) {
  try {
    const requestBody = await post.request.json();
    const { source } = requestBody;
    const body = await graphql({ schema, source });
    return json(body);
  } catch (e) {
    return e;
  }
}
