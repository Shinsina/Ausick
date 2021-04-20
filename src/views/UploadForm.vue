<template>
<div class="text-center">
  <label for="jsonUploader">Select a data file: </label>
<input type="file" id="jsonUploader">
<div v-if="formFields">
    <div v-for="(field, key) in formFields" :key="key">
      <InputField :labelName="key" :type="field"/>
    </div>
</div>
</div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import InputField from '../components/InputField.vue'
const DataBaseConnection = 'http://localhost:3000/graphql'
@Options({
  components: {
    InputField
  },
  data () {
    return {
      uploaderType: null,
      formFields: null,
      artistFields: {
        artistId: 'number',
        artistName: 'text',
        bio: 'text',
        photo: 'text',
        founded: 'number',
        hometown: 'text',
        members: 'text'
      },
      albumFields: {
        wrapperType: 'text',
        collectionType: 'text',
        artistId: 'number',
        collectionId: 'number',
        amgArtistId: 'number',
        artistName: 'text',
        collectionName: 'text',
        collectionCensoredName: 'text',
        artistViewUrl: 'text',
        collectionViewUrl: 'text',
        artworkUrl60: 'text',
        artworkUrl100: 'text',
        collectionPrice: 'number',
        collectionExplicitness: 'text',
        trackCount: 'number',
        copyright: 'text',
        country: 'text',
        currency: 'text',
        releaseDate: 'text',
        primaryGenreName: 'text'
      },
      songFields: {
        wrapperType: 'text',
        kind: 'text',
        artistId: 'number',
        collectionId: 'number',
        trackId: 'number',
        artistName: 'text',
        collectionName: 'text',
        trackName: 'text',
        collectionCensoredName: 'text',
        trackCensoredName: 'text',
        artistViewUrl: 'text',
        collectionViewUrl: 'text',
        trackViewUrl: 'text',
        previewUrl: 'text',
        artworkUrl30: 'text',
        artworkUrl60: 'text',
        artworkUrl100: 'text',
        collectionPrice: 'number',
        trackPrice: 'number',
        releaseDate: 'text',
        collectionExplicitness: 'text',
        trackExplicitness: 'text',
        discCount: 'number',
        discNumber: 'number',
        trackCount: 'number',
        trackNumber: 'number',
        trackTimeMillis: 'number',
        country: 'text',
        currency: 'text',
        primaryGenreName: 'text'
      }
    }
  },
  created () {
    // console.log(this.$router.currentRoute.value.params.type)
    this.uploaderType = this.$router.currentRoute.value.params.type
    // console.log(this.uploaderType)
    if (this.uploaderType === 'artist') {
      this.formFields = this.artistFields
    } else if (this.uploaderType === 'album') {
      this.formFields = this.albumFields
    } else if (this.uploaderType === 'song') {
      this.formFields = this.songFields
    } else {
      this.formFields = {}
    }
    // console.log(this.formFields)
  },
  methods: {
    submitForm () {
      if (this.formFields === this.artistFields) {
        this.putArtist()
      } else if (this.formFields === this.albumFields) {
        this.putAlbum()
      } else {
        this.putSong()
      }
    },

    // Album Uploader Function
    async putAlbum (album: Record<string, unknown>) {
      try {
        const res = await axios.post(DataBaseConnection, { query: `mutation { addAlbum(wrapperType: "${album.wrapperType}" collectionType: "${album.collectionType}" artistId: ${album.artistId} collectionId: ${album.collectionId} amgArtistId: ${album.amgArtistId} artistName: "${album.artistName}" collectionName: "${album.collectionName}" collectionCensoredName: "${album.collectionCensoredName}" artistViewUrl: "${album.artistViewUrl}" collectionViewUrl: "${album.collectionViewUrl}" artworkUrl60: "${album.artworkUrl60}" artworkUrl100: "${album.artworkUrl100}" collectionPrice: ${album.collectionPrice} collectionExplicitness: "${album.collectionExplicitness}" trackCount: ${album.trackCount} copyright: "${album.copyright}" country: "${album.country}" currency: "${album.currency}" releaseDate: "${album.releaseDate}" primaryGenreName: "${album.primaryGenreName}") {wrapperType collectionType artistId collectionId amgArtistId artistName collectionName collectionCensoredName artistViewUrl collectionViewUrl artworkUrl60 artworkUrl100 collectionPrice collectionExplicitness trackCount copyright country currency releaseDate primaryGenreName} }` })
        console.log(res.data.errors)
      } catch (e) {
        console.log('err', e)
      }
    },
    // Song Uploader Function
    async putSong (song: Record<string, unknown>) {
      try {
        const res = await axios.post(DataBaseConnection, { query: `mutation { addSong(wrapperType: "${song.wrapperType}" kind: "${song.kind}" artistId: ${song.artistId} collectionId: ${song.collectionId} trackId: ${song.trackId} artistName: "${song.artistName}" collectionName: "${song.collectionName}" trackName: "${song.trackName}" collectionCensoredName: "${song.collectionCensoredName}" trackCensoredName: "${song.trackCensoredName}" artistViewUrl: "${song.artistViewUrl}" collectionViewUrl: "${song.collectionViewUrl}" trackViewUrl: "${song.trackViewUrl}" previewUrl: "${song.previewUrl}" artworkUrl30: "${song.artworkUrl30}" artworkUrl60: "${song.artworkUrl60}" artworkUrl100: "${song.artworkUrl100}"  collectionPrice: ${song.collectionPrice} trackPrice: ${song.trackPrice} releaseDate: "${song.releaseDate}" collectionExplicitness: "${song.collectionExplicitness}" trackExplicitness: "${song.trackExplicitness}" discCount: ${song.discCount} discNumber: ${song.discNumber} trackCount: ${song.trackCount} trackNumber: ${song.trackNumber} trackTimeMillis: ${song.trackTimeMillis} country: "${song.country}" currency: "${song.currency}" primaryGenreName: "${song.primaryGenreName}" isStreamable: ${song.isStreamable}){wrapperType kind artistId collectionId trackId artistName collectionName trackName collectionCensoredName trackCensoredName artistViewUrl collectionViewUrl trackViewUrl previewUrl artworkUrl30 artworkUrl60 artworkUrl100 collectionPrice trackPrice releaseDate collectionExplicitness trackExplicitness discCount discNumber trackCount trackNumber trackTimeMillis country currency primaryGenreName isStreamable} }` })
        console.log(res.data.errors)
      } catch (e) {
        console.log('err', e)
      }
    },
    // Artist Uploader Function
    async putArtist (artist: Record<string, unknown>) {
      try {
        // console.log(artist.artistId)
        const res = await axios.post(DataBaseConnection, { query: `mutation { addArtist(artistId: ${artist.artistId} artistName: "${artist.artistName}" bio: "${artist.bio}" photo: "${artist.photo}" founded: ${artist.founded} hometown: "${artist.hometown}" members: "${artist.members}"){artistName bio photo hometown members} }` })
        console.log(res.data.errors)
      } catch (e) {
        console.log('err', e)
      }
    }
  }
})
export default class UploadForm extends Vue {}
</script>
