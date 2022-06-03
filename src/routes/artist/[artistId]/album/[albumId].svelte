<script context="module" lang="ts">
  import type { Album, Song } from '$lib/typeDefs';
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
    const { artistId, albumId } = params;
    const url = 'http://localhost:3000/graphql';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `{ albums(url: "https://itunes.apple.com/lookup?id=${artistId}&entity=album") { results { collectionId,collectionName,collectionCensoredName,artworkUrl100,collectionPrice,collectionExplicitness,trackCount,copyright,releaseDate,primaryGenreName}} songs(url: "https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=500") { results{collectionId, trackId,trackName,trackCensoredName,trackPrice,trackExplicitness,discCount,discNumber,trackNumber,trackTimeMillis}} }`
      })
    });
    if (res.ok) {
      const resolvedData = await res.json();
      if (resolvedData.data) {
        const { albums, songs } = resolvedData.data;
        const album = albums.results.filter(
          (album: Album) => album.collectionId === Number(albumId)
        )[0];
        album.songs = [
          ...songs.results.filter((song: Song) => song.collectionId === Number(albumId))
        ];
        return {
          props: {
            album
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
  import { sortSongs } from '$lib/sorts';
  export let album: Album;

  function trackLength(trackLength: number) {
    const minutes = Math.floor(trackLength / 60000);
    const seconds = Number(((trackLength % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
</script>

<div>
  {#if album}
    <div class="text-center h-screen pt-5">
      <div class="flex justify-center">
        <img src={album.artworkUrl100} alt={album.collectionName} />
      </div>
      <p>{album.collectionName} ${album.collectionPrice}</p>
      <p>{album.releaseDate}</p>
      {#each sortSongs(album.songs) as song}
        <div class="flex justify-center">
          {song.trackNumber}. {song.trackName}
          {trackLength(song.trackTimeMillis)} ${song.trackPrice}
        </div>
      {/each}
      <div class="bg-black">
        <p>{album.copyright}</p>
        <button on:click|preventDefault={() => alert('Thank you for your purchase!')}>Buy</button>
      </div>
    </div>
  {/if}
</div>
