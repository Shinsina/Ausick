<script lang="ts">
  import type { Artist } from '$lib/typeDefs';
  import { goto } from '$app/navigation';

  export let artist: Artist,
    showBio: Boolean = false;

  const border = showBio ? '' : 'border-white border-2 border-t-0';
</script>

<div class="flex-col w-1/4 text-center lg:text-xl sm:text-xs">
  <div
    on:click|preventDefault={() => {
      if (!showBio) goto(`/artist/${artist.artistId}`);
    }}
    on:keydown|preventDefault={() => {
      if (!showBio) goto(`artist/${artist.artistId}`);
    }}
    class={border}
  >
    <p>{artist.artistName}</p>
    <div class="flex justify-center">
      <img src={artist.photo} alt={artist.artistName} width="380" height="380" />
    </div>
    <p>Founded {artist.founded} in {artist.hometown}</p>
    {#if showBio}<p class="text-base pt-5">{artist.bio}</p>{/if}
  </div>
</div>
