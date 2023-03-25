import type { APIRoute } from 'astro';
import type { Album, Song } from '$lib/typeDefs';
import { sortSongs } from '$lib/sorts';

export function getStaticPaths() {
  return [
    { params: { artistId: 425209960, albumId: 1655611273 } },
    { params: { artistId: 425209960, albumId: 1635143824 } },
    { params: { artistId: 425209960, albumId: 1583345182 } },
    { params: { artistId: 425209960, albumId: 1639856265 } },
    { params: { artistId: 425209960, albumId: 1640134194 } },
    { params: { artistId: 425209960, albumId: 1639856165 } },
    { params: { artistId: 425209960, albumId: 1499751485 } },
    { params: { artistId: 425209960, albumId: 1469141575 } },
    { params: { artistId: 425209960, albumId: 1410932544 } },
    { params: { artistId: 425209960, albumId: 1245387626 } },
    { params: { artistId: 425209960, albumId: 1067836904 } },
    { params: { artistId: 425209960, albumId: 912711273 } },
    { params: { artistId: 425209960, albumId: 667163965 } },
    { params: { artistId: 425209960, albumId: 506187633 } },
    { params: { artistId: 390853789, albumId: 1641064212 } },
    { params: { artistId: 390853789, albumId: 1626800893 } },
    { params: { artistId: 390853789, albumId: 1622325412 } },
    { params: { artistId: 390853789, albumId: 1600440119 } },
    { params: { artistId: 390853789, albumId: 1595875181 } },
    { params: { artistId: 390853789, albumId: 1506160245 } },
    { params: { artistId: 390853789, albumId: 1507953795 } },
    { params: { artistId: 390853789, albumId: 1499966258 } },
    { params: { artistId: 390853789, albumId: 1369142452 } },
    { params: { artistId: 390853789, albumId: 1360573403 } },
    { params: { artistId: 390853789, albumId: 1360533590 } },
    { params: { artistId: 390853789, albumId: 1360583983 } },
    { params: { artistId: 390853789, albumId: 1360654724 } },
    { params: { artistId: 390853789, albumId: 1360669798 } },
    { params: { artistId: 390853789, albumId: 1360678993 } },
    { params: { artistId: 390853789, albumId: 1360694656 } },
    { params: { artistId: 390853789, albumId: 1360685337 } },
    { params: { artistId: 390853789, albumId: 1360709765 } },
    { params: { artistId: 421186855, albumId: 1665099563 } },
    { params: { artistId: 421186855, albumId: 1570619916 } },
    { params: { artistId: 421186855, albumId: 1571743739 } },
    { params: { artistId: 421186855, albumId: 1500483634 } },
    { params: { artistId: 421186855, albumId: 1465699191 } },
    { params: { artistId: 421186855, albumId: 1415710251 } },
    { params: { artistId: 421186855, albumId: 1244350124 } },
    { params: { artistId: 421186855, albumId: 1124201464 } },
    { params: { artistId: 421186855, albumId: 1078772149 } },
    { params: { artistId: 421186855, albumId: 1676867700 } },
    { params: { artistId: 421186855, albumId: 662173579 } },
    { params: { artistId: 449513466, albumId: 1672673563 } },
    { params: { artistId: 449513466, albumId: 1665262017 } },
    { params: { artistId: 449513466, albumId: 1652971069 } },
    { params: { artistId: 449513466, albumId: 1604664754 } },
    { params: { artistId: 449513466, albumId: 1592373979 } },
    { params: { artistId: 449513466, albumId: 1591681212 } },
    { params: { artistId: 449513466, albumId: 1580816503 } },
    { params: { artistId: 449513466, albumId: 1570341571 } },
    { params: { artistId: 449513466, albumId: 1529948637 } },
    { params: { artistId: 449513466, albumId: 1490646534 } },
    { params: { artistId: 449513466, albumId: 1397952841 } },
    { params: { artistId: 449513466, albumId: 1182620561 } },
    { params: { artistId: 449513466, albumId: 1145665931 } },
    { params: { artistId: 449513466, albumId: 1114195581 } },
    { params: { artistId: 449513466, albumId: 1056383906 } },
    { params: { artistId: 449513466, albumId: 1013231573 } },
    { params: { artistId: 449513466, albumId: 855626531 } },
    { params: { artistId: 449513466, albumId: 552133419 } },
    { params: { artistId: 449513466, albumId: 552133417 } },
    { params: { artistId: 449513466, albumId: 471750216 } },
    { params: { artistId: 449513466, albumId: 1360030299 } },
    { params: { artistId: 449513466, albumId: 1359868689 } },
  ]
};

export const get: APIRoute = async ({ params }) => {
  const { artistId, albumId } = params;
  const albumResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
  const albums = await albumResponse.json();
  const songResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=500`);
  const songs = await songResponse.json();
    if (albums && songs) {
      const album =
        albums.results.find((album: Album) => album.collectionId === Number(albumId)) || {};
      album.songs = sortSongs([
        ...songs.results.filter((song: Song) => song.collectionId === Number(albumId))
      ]);
      return {
        body: JSON.stringify([album])
      };
    }
    return {
      body: JSON.stringify([])
    }
  };