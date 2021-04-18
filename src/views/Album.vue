<template>
<div v-if="album" class="text-center">
  <div class="flex justify-center" v-on:click.prevent="goToAlbumPage(album.id)">
    <img :src="album.artworkUrl100" />
  </div>
  <p>{{album.collectionName}}</p>
  <div class="flex justify-center" v-for="song in sortSongs(album.songs)" :key="song.id">
    {{song.trackNumber}}. {{song.trackName}}
  </div>
</div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import _ from 'lodash'
const DataBaseConnection = 'http://localhost:3000/graphql'
const options = { headers: { 'Content-Type': 'application/json' } }
@Options({
  components: {
  },
  data () {
    return {
      album: {}
    }
  },
  created () {
    this.getRequest(this.$router.currentRoute.value.params.albumId)
  },
  methods: {
    async getRequest (id: string) {
      try {
        console.log(id)
        const queryString = 'album(id:"' + id + '"){id,artistName,collectionName,artworkUrl100,collectionPrice,copyright,releaseDate,collectionExplicitness,songs{id,trackName,trackPrice,trackNumber,trackTimeMillis}}'
        const res = await axios.post(DataBaseConnection, { query: '{' + queryString + '}' }, options)
        this.album = res.data.data.album
        console.log(this.album)
      } catch (e) {
        console.log('err', e)
      }
    },
    sortSongs (songs: Array<Record<string, unknown>>) {
      return _.orderBy(songs, 'trackNumber', 'asc')
    }
  }
})
export default class Album extends Vue {}
</script>
