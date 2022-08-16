import type { PageLoad } from './$types';
import type { Album, Song } from '$lib/typeDefs';
import { albumQuery } from '$lib/graphql/queries';
import { sortSongs } from '$lib/sorts';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export const load: PageLoad = async ({ fetch, params }) => {
  const { artistId, albumId } = params;
  const url = '/endpoints';
  const source = albumQuery(artistId);
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
      const { albums, songs } = resolvedData.data;
      const album =
        albums.results.find((album: Album) => album.collectionId === Number(albumId)) || {};
      album.songs = sortSongs([
        ...songs.results.filter((song: Song) => song.collectionId === Number(albumId))
      ]);
      return {
        album
      };
    }
  }
  throw new Error(
    '@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)'
  );
  return {
    artist: {}
  };
};
