import type { Album, Song } from './typeDefs';

export function sortAlbums(albums: Array<Album>) {
  return albums.sort((album1: Album, album2: Album) => {
    if (album1.releaseDate > album2.releaseDate) {
      return -1;
    }
    return 1;
  });
}
export function sortSongs(songs: Array<Song>) {
  return songs.sort((song1: Song, song2: Song) => {
    if (song1.trackNumber < song2.trackNumber) {
      return -1;
    }
    return 1;
  });
}
