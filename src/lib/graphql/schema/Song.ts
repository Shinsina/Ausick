import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import axios from 'axios';

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    wrapperType: { type: GraphQLString },
    kind: { type: GraphQLString },
    artistId: { type: GraphQLInt },
    collectionId: { type: GraphQLInt },
    trackId: { type: GraphQLInt },
    artistName: { type: GraphQLString },
    collectionName: { type: GraphQLString },
    trackName: { type: GraphQLString },
    collectionCensoredName: { type: GraphQLString },
    trackCensoredName: { type: GraphQLString },
    artistViewUrl: { type: GraphQLString },
    collectionViewUrl: { type: GraphQLString },
    trackViewUrl: { type: GraphQLString },
    previewUrl: { type: GraphQLString },
    artworkUrl30: { type: GraphQLString },
    artworkUrl60: { type: GraphQLString },
    artworkUrl100: { type: GraphQLString },
    collectionPrice: { type: GraphQLFloat },
    trackPrice: { type: GraphQLFloat },
    releaseDate: { type: GraphQLString },
    collectionExplicitness: { type: GraphQLString },
    trackExplicitness: { type: GraphQLString },
    discCount: { type: GraphQLInt },
    discNumber: { type: GraphQLInt },
    trackCount: { type: GraphQLInt },
    trackNumber: { type: GraphQLInt },
    trackTimeMillis: { type: GraphQLInt },
    country: { type: GraphQLString },
    currency: { type: GraphQLString },
    primaryGenreName: { type: GraphQLString },
    isStreamable: { type: GraphQLBoolean }
  })
});

const OverallSongDefinitionType = new GraphQLObjectType({
  name: 'OverallSongDefinition',
  fields: () => ({
    results: { type: new GraphQLList(SongType) },
    resultCount: { type: GraphQLInt }
  })
});

export default {
  type: OverallSongDefinitionType,
  args: { url: { type: GraphQLString } },
  resolve(_: unknown, args: Record<string, string>) {
    return axios(args.url).then((data) => data.data);
  }
};
