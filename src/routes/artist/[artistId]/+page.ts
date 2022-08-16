import type { PageLoad } from './$types';
import type { Album, Song } from '$lib/typeDefs';
import { albumsQuery } from '$lib/graphql/queries';
import { sortAlbums, sortSongs } from '$lib/sorts';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export const load: PageLoad = async ({ fetch, params }) => {
  const { artistId } = params;
  const url = '/endpoints';
  const source = albumsQuery(artistId);
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
      const { artist, albums, songs } = resolvedData.data;
      artist.albums = sortAlbums(albums.results.filter((album: Album) => album.collectionId));
      songs.results
        .filter((result: Song) => result.collectionId)
        .forEach((song: Song) => {
          const albumForSongIndex = Array.from(
            artist.albums.map((album: Album) => album.collectionId)
          ).indexOf(song.collectionId);
          if (albumForSongIndex >= 0) {
            if (artist.albums[albumForSongIndex].songs)
              artist.albums[albumForSongIndex].songs.push(song);
            else artist.albums[albumForSongIndex].songs = [song];
          }
        });
      artist.albums.forEach((album: Album, index: number) => {
        const { songs } = album;
        artist.albums[index].songs = sortSongs(songs);
      });
      return {
        artist
      };
    }
  }
  return {
    artist: {}
  };
};
