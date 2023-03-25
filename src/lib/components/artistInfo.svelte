<script lang="ts">
  import type { Artist } from '$lib/typeDefs';

  export let artist: Artist,
    showBio: Boolean = false;

  const goTo = `/artist/${artist.artistId}`
  const border = showBio ? '' : 'border-white border-2 border-t-0';
</script>

<div class="flex-col w-1/4 text-center lg:text-xl sm:text-xs">
  <a href={goTo} rel="prefetch">
    <div class={border}>
      <p>{artist.artistName}</p>
      <div class="flex justify-center">
        <img src={artist.photo} alt={artist.artistName} width="380" height="380" />
      </div>
      <p>Founded {artist.founded} in {artist.hometown}</p>
      {#if showBio}<p class="text-base pt-5">{artist.bio}</p>{/if}
    </div>
  </a>
</div>
