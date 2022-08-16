<script lang="ts">
  import type { Album } from '$lib/typeDefs';
  import AlbumInfo from '$lib/components/albumInfo.svelte';

  export let data: Record<string, Album>;

  const { album } = data;
</script>

<div>
  {#if album}
    <div class="text-center h-screen pt-5">
      <AlbumInfo {album} />
    </div>
  {/if}
</div>
