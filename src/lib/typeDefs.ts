export type Artist = {
  artistId: number;
  artistName: string;
  bio: string;
  photo: string;
  founded: number;
  hometown: string;
  albums: Array<Album>;
};

export type Album = {
  collectionId: number;
  collectionName: string;
  collectionCensoredName: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright: string;
  releaseDate: string;
  primaryGenreName: string;
  songs: Array<Song>;
};

export type Song = {
  collectionId: number;
  trackId: number;
  trackName: string;
  trackCensoredName: string;
  trackPrice: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackNumber: number;
  trackTimeMillis: number;
};
