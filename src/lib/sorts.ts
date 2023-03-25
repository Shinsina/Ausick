import type { Album, Song } from './typeDefs';

/**
 *
 * @param albums An array of an artists Albums
 * @returns The array sorted by releaseDate (Newest to Oldest)
 */
export function sortAlbums(albums: Array<Album>) {
  return albums.sort((album1: Album, album2: Album) => {
    if (album1.releaseDate > album2.releaseDate) {
      return -1;
    }
    return 1;
  });
}

/**
 *
 * @param songs An array of an albums Songs
 * @returns The array sorted by trackNumber (Lowest to Highest)
 */
export function sortSongs(songs: Array<Song>) {
  return songs.sort((song1: Song, song2: Song) => {
    if (song1.trackNumber < song2.trackNumber) {
      return -1;
    }
    return 1;
  });
}
