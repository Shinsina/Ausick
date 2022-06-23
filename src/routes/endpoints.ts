import { graphql } from 'graphql';
import schema from '$lib/graphql/schema';

export async function post(post: { request: Response }) {
  try {
    const requestBody = await post.request.json();
    const { source } = requestBody;
    const body = await graphql({ schema, source });
    return { status: 200, body };
  } catch (e) {
    return e;
  }
}
