import type { PageLoad } from './$types';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export const load: PageLoad = async ({ fetch }) => {
  const url = '/endpoints';
  const source = '{ artists { artistId, artistName, photo, founded, hometown } }';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ source })
  });
  if (res.ok) {
    const resolvedData = await res.json();
    if (resolvedData.data) {
      const { artists } = resolvedData.data;
      return {
        artists
      };
    }
  }
  return {
    artists: []
  };
};
