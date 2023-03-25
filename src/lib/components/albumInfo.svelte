<script lang="ts">
  import type { Album } from '$lib/typeDefs';

  export let album: Album,
    navigateTo: Function = () => '';

  function trackLength(trackLength: number) {
    const minutes = Math.floor(trackLength / 60000);
    const seconds = Number(((trackLength % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
</script>

<a href={navigateTo(album)}>
  <div class="flex justify-center">
    <img src={album.artworkUrl100} alt={album.collectionName} width="100" height="100" />
  </div>
</a>
<p>
  {album.collectionName}
  {#if album.collectionPrice}${album.collectionPrice}{/if}
</p>
{#if album.releaseDate && !navigateTo(album)}
  <p>{album.releaseDate}</p>
{/if}
<p class="pb-5">{album.copyright}</p>
{#each album.songs as song}
  <div class="flex justify-center">
    {song.trackNumber}. {song.trackName}
    {#if song.trackTimeMillis && song.trackPrice}
      {trackLength(song.trackTimeMillis)} ${song.trackPrice}
    {/if}
  </div>
{/each}
{#if !navigateTo(album)}
  <button on:click|preventDefault={() => alert('Thank you for your purchase!')}>Buy</button>
{/if}
