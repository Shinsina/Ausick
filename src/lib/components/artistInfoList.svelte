<script lang="ts">
  import type { Artist } from '$lib/typeDefs';
  import ArtistInfo from '$lib/components/artistInfo.svelte';

  export let data: Array<Artist>;
</script>

<div class="md:flex md:h-screen">
  {#each data as artist}
    <ArtistInfo {artist} />
  {/each}
</div>
