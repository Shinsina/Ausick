<script lang="ts">
  import type { Artist } from '$lib/typeDefs';
  import ArtistInfo from '$lib/components/artistInfo.svelte';

  export let data: Record<string, Array<Artist>>;
  const { artists } = data;
</script>

<div class="flex h-screen">
  {#each artists as artist}
    <ArtistInfo {artist} />
  {/each}
</div>
