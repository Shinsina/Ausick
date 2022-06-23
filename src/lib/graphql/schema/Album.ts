import { GraphQLInt, GraphQLFloat, GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import axios from 'axios';

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    wrapperType: { type: GraphQLString },
    collectionType: { type: GraphQLString },
    artistId: { type: GraphQLInt },
    collectionId: { type: GraphQLInt },
    amgArtistId: { type: GraphQLInt },
    artistName: { type: GraphQLString },
    collectionName: { type: GraphQLString },
    collectionCensoredName: { type: GraphQLString },
    artistViewUrl: { type: GraphQLString },
    collectionViewUrl: { type: GraphQLString },
    artworkUrl60: { type: GraphQLString },
    artworkUrl100: { type: GraphQLString },
    collectionPrice: { type: GraphQLFloat },
    collectionExplicitness: { type: GraphQLString },
    contentAdvisoryRating: { type: GraphQLString },
    trackCount: { type: GraphQLInt },
    copyright: { type: GraphQLString },
    country: { type: GraphQLString },
    currency: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    primaryGenreName: { type: GraphQLString }
  })
});

const OverallAlbumDefinitionType = new GraphQLObjectType({
  name: 'OverallAlbumDefinition',
  fields: () => ({
    results: { type: new GraphQLList(AlbumType) },
    resultCount: { type: GraphQLInt }
  })
});

export default {
  type: OverallAlbumDefinitionType,
  args: { url: { type: GraphQLString } },
  resolve(_: unknown, args: Record<string, string>) {
    return axios(args.url).then((res) => res.data);
  }
};
