<script lang="ts">
  import type { Artist, Album } from '$lib/typeDefs';
  import AlbumInfo from '$lib/components/albumInfo.svelte';

  export let artist: Artist;

  const navigateTo = (album: Album) => {
    return `/Ausick/artist/${artist.artistId}/album/${album.collectionId}`;
  };
</script>


<div class="flex flex-wrap w-full">
  {#each artist.albums as album}
    <div class="w-1/4 text-center">
      <AlbumInfo {album} {navigateTo} />
    </div>
  {/each}
</div>
