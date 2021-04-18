<template>
  <div class="home">
    <div class="flex justify-start pl-10">
    <div v-for="artist in artistArray" :key="artist.id" class="flex-col w-1/4 text-center">
      <div class="flex">
      <div v-on:click.prevent="goToArtistPage(artist.id)">
        {{ artist.artistName }}
        <div class="flex justify-center">
        <img :src="artist.photo" width="380" height="380"/>
        </div>
        Founded {{ artist.founded }} in {{ artist.hometown }}
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
const DataBaseConnection = 'http://localhost:3000/graphql'
const options = { headers: { 'Content-Type': 'application/json' } }
@Options({
  components: {
  },
  data () {
    return {
      artistArray: []
    }
  },
  created () {
    this.getRequest()
  },
  methods: {
    async getRequest () {
      try {
        const res = await axios.post(DataBaseConnection, { query: '{ artists{ id, artistId, artistName, photo, founded, hometown } }' }, options)
        console.log(this.artistArray)
        res.data.data.artists.forEach((artist: Record<string, unknown>) => {
          this.artistArray = [...this.artistArray, artist]
        })
        console.log(this.artistArray)
      } catch (e) {
        console.log('err', e)
      }
    },
    goToArtistPage (artistId: string) {
      this.$router.push(`/artist/${artistId}`)
    }
  }
})
export default class Home extends Vue {}
</script>
