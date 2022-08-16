<script lang="ts">
  import type { Artist, Album } from '$lib/typeDefs';
  import ArtistInfo from '$lib/components/artistInfo.svelte';
  import AlbumInfo from '$lib/components/albumInfo.svelte';

  export let data: Record<string, Artist>;

  const { artist } = data;

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
