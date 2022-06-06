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
  artworkUrl100: string;
  collectionPrice: number;
  copyright: string;
  releaseDate: string;
  songs: Array<Song>;
};

export type Song = {
  collectionId: number;
  trackId: number;
  trackName: string;
  trackPrice: string;
  trackNumber: number;
  trackTimeMillis: number;
};
