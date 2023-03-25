import type { APIRoute } from 'astro';
import Artists from '$lib/data/Artist.json';
import { sortAlbums, sortSongs } from '$lib/sorts';
import type { Artist, Album, Song } from "$lib/typeDefs";

export function getStaticPaths() {
  return [
    { params: { artistId: 425209960 } },
    { params: { artistId: 390853789 } },
    { params: { artistId: 421186855 } },
    { params: { artistId: 449513466 } },
  ]
};
export const get: APIRoute = async ({ params }) => {
  const { artistId } = params;
  const artist = Artists.find((artist) => artist.artistId === Number(artistId));
  const albumResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
  const albumData = await albumResponse.json();
  const songResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=500`);
  const songData = await songResponse.json();
  if (artist) {
    const completeArtist: Artist = {
      ...artist,
      albums: [],
    }
    completeArtist.albums = sortAlbums(albumData.results.filter((album: Album) => album.collectionId));
    songData.results
      .filter((result: Song) => result.collectionId)
      .forEach((song: Song) => {
        delete song.trackPrice;
        const albumForSongIndex = Array.from(
          completeArtist.albums.map((album: Album) => album.collectionId)
        ).indexOf(song.collectionId);
        if (albumForSongIndex >= 0) {
          if (completeArtist.albums[albumForSongIndex].songs)
          completeArtist.albums[albumForSongIndex].songs.push(song);
          else completeArtist.albums[albumForSongIndex].songs = [song];
        }
      });
      completeArtist.albums.forEach((album: Album, index: number) => {
      // Use this to obtain the values for the album getStaticPaths() function
      // console.log({ params: { artistId: completeArtist.artistId, albumId: album.collectionId } })
      const { songs } = album;
      delete album.collectionPrice;
      completeArtist.albums[index].songs = sortSongs(songs);
    });
    return {
      body: JSON.stringify([completeArtist])
    }
  }
  return {
    body: JSON.stringify([])
  }
};
