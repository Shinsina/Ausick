<script context="module" lang="ts">
  import type { Artist, Album, Song } from '$lib/typeDefs';
  import { albumsQuery } from '$lib/graphql/queries';
  import { sortAlbums, sortSongs } from '$lib/sorts';
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
  import ArtistInfo from '$lib/components/artistInfo.svelte';
  import AlbumInfo from '$lib/components/albumInfo.svelte';

  export let artist: Artist;

  const showBio = true;

  const navigateTo = (album: Album) => {
    return `/artist/${artist.artistId}/album/${album.collectionId}`;
  };
</script>

<div>
  {#if artist}
    <div class="w-full flex border-white border-2 border-t-0 pt-5">
      <ArtistInfo {artist} {showBio} />
      <div class="flex flex-wrap w-full">
        {#each artist.albums as album}
          <div class="w-1/4 text-center">
            <AlbumInfo {album} {navigateTo} />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
