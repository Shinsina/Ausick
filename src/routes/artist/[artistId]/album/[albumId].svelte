<script context="module" lang="ts">
  import type { Album, Song } from '$lib/typeDefs';
  import { albumQuery } from '$lib/graphql/queries';
  import { sortSongs } from '$lib/sorts';
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
  import AlbumInfo from '$lib/components/albumInfo.svelte';

  export let album: Album;
</script>

<div>
  {#if album}
    <div class="text-center h-screen pt-5">
      <AlbumInfo {album} />
    </div>
  {/if}
</div>
