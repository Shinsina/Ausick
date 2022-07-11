<script context="module" lang="ts">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }: { fetch: Function }): Promise<Record<string, unknown>> {
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
          props: {
            artists
          }
        };
      }
    }
    return {
      artists: []
    };
  }
</script>

<script lang="ts">
  import type { Artist } from '$lib/typeDefs';
  import ArtistInfo from '$lib/components/artistInfo.svelte';

  export let artists: Array<Artist>;
</script>

<div class="flex h-screen">
  {#each artists as artist}
    <ArtistInfo {artist} />
  {/each}
</div>
