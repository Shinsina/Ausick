<script context="module" lang="ts">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }: { fetch: Function }): Promise<Record<string, unknown>> {
    const url = 'http://localhost:3000/graphql';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: '{ artists { artistId, artistName, photo, founded, hometown } }'
      })
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
  import { goto } from '$app/navigation';

  export let artists: Array<Record<string, string>>;
</script>

<div class="flex h-screen">
  {#each artists as artist}
    <div v-for="artist in artistArray" class="flex-col w-1/4 text-center">
      <div class="flex-auto border-white border-2 border-t-0">
        <div
          on:click|preventDefault={() => goto(`/artist/${artist.artistId}`)}
          class="block lg:text-xl md:text-xs sm:text-xs break-words text-center"
        >
          {artist.artistName}
          <div class="flex justify-center">
            <img src={artist.photo} alt={artist.artistName} width="380" height="380" />
          </div>
          Founded {artist.founded} in {artist.hometown}
        </div>
      </div>
    </div>
  {/each}
</div>
