const axios = require('axios')
const fs = require('fs')

const DataBaseConnection = 'http://localhost:3000/graphql'
const cleanData = fs.readFileSync('./The Amity Affliction API Data CLEAN.json', { encoding: 'utf8'})
let music = JSON.parse(cleanData)
async function putRequest(album) {
  try {
    const res = await axios.post(DataBaseConnection, { query: `mutation { addAlbum(wrapperType: "${album.wrapperType}" collectionType: "${album.collectionType}" artistId: ${album.artistId} collectionId: ${album.collectionId} amgArtistId: ${album.amgArtistId} artistName: "${album.artistName}" collectionName: "${album.collectionName}" collectionCensoredName: "${album.collectionCensoredName}" artistViewUrl: "${album.artistViewUrl}" collectionViewUrl: "${album.collectionViewUrl}" artworkUrl60: "${album.artworkUrl60}" artworkUrl100: "${album.artworkUrl100}" collectionPrice: ${album.collectionPrice} collectionExplicitness: "${album.collectionExplicitness}" trackCount: ${album.trackCount} copyright: "${album.copyright}" country: "${album.country}" currency: "${album.currency}" releaseDate: "${album.releaseDate}" primaryGenreName: "${album.primaryGenreName}") {wrapperType collectionType artistId collectionId amgArtistId artistName collectionName collectionCensoredName artistViewUrl collectionViewUrl artworkUrl60 artworkUrl100 collectionPrice collectionExplicitness trackCount copyright country currency releaseDate primaryGenreName} }` })
  } catch(e) {
    console.log('err', e)
  }
}
music.results.forEach(album => {
  putRequest(album)
})
