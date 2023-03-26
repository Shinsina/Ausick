<script lang="ts">
  import type { Artist } from '$lib/typeDefs';
  import AlbumInfo from '$lib/components/albumInfo.svelte';

  export let artist: Artist;
</script>


<div class="flex flex-wrap w-full">
  {#each artist.albums as album}
    <div class="w-full md:w-1/4 text-center">
      <AlbumInfo
        {album}
        navigateTo={`/Ausick/artist/${artist.artistId}/album/${album.collectionId}`}
      />
    </div>
  {/each}
</div>
