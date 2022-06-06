<script context="module" lang="ts">
  import type { Album, Song } from '$lib/typeDefs';
  import { albumsQuery } from '$lib/queries';
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({
    fetch,
    params
  }: {
    fetch: Function;
    params: Record<string, string>;
  }): Promise<Record<string, unknown>> {
    const { artistId } = params;
    const url = 'http://localhost:3000/graphql';
    const query = albumsQuery(artistId);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    if (res.ok) {
      const resolvedData = await res.json();
      if (resolvedData.data) {
        const { artist, albums, songs } = resolvedData.data;
        artist.albums = albums.results.filter((album: Album) => album.collectionId);
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
        return {
          props: {
            artist
          }
        };
      }
    }
    return {
      artist: {}
    };
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Artist } from '$lib/typeDefs';
  import { sortAlbums, sortSongs } from '$lib/sorts';
  export let artist: Artist;
</script>

<div>
  {#if artist}
    <div class="w-full flex border-white border-2 border-t-0 pt-5">
      <div class="flex-col w-1/4 text-center  text-xl">
        <p>{artist.artistName}</p>
        <div class="flex justify-center">
          <img src={artist.photo} alt={artist.artistName} width="380" height="380" />
        </div>
        <p>Founded {artist.founded} in {artist.hometown}</p>
        <p class="text-base pt-5">{artist.bio}</p>
      </div>
      <div class="flex flex-wrap w-full">
        {#each sortAlbums(artist.albums) as album}
          <div class="w-1/4 text-center">
            <div
              on:click|preventDefault={() =>
                goto(`/artist/${artist.artistId}/album/${album.collectionId}`)}
              class="flex justify-center"
            >
              <img src={album.artworkUrl100} alt={album.collectionName} />
            </div>
            <p>{album.collectionName}</p>
            <p class="pb-5">{album.copyright}</p>
            {#each sortSongs(album.songs) as song}
              <div class="flex justify-center">
                {song.trackNumber}. {song.trackName}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
