export function albumsQuery(artistId: string) {
  return `{
    artist(artistId: ${artistId}){artistId,artistName,bio,photo,founded,hometown}
    albums(url: "https://itunes.apple.com/lookup?id=${artistId}&entity=album") {
      results {
        collectionId,
        collectionName,
        artworkUrl100,
        copyright,
        releaseDate
      }
    }
    songs(url: "https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=500") {
      results {
        collectionId,
        trackName,
        trackNumber
      }
    }
  }`;
}

export function albumQuery(artistId: string) {
  return `{
    albums(url: "https://itunes.apple.com/lookup?id=${artistId}&entity=album") {
      results {
        collectionId,
        collectionName,
        artworkUrl100,
        collectionPrice,
        copyright,
        releaseDate
      }
    }
    songs(url: "https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=500") {
      results {
        collectionId,
        trackId,
        trackName,
        trackPrice,
        trackNumber,
        trackTimeMillis
      }
    }
  }`;
}
