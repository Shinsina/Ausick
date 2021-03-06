import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import ArtistData from '../../data/Artist.json';

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    artistId: { type: GraphQLInt },
    artistName: { type: GraphQLString },
    bio: { type: GraphQLString },
    photo: { type: GraphQLString },
    founded: { type: GraphQLInt },
    hometown: { type: GraphQLString },
    members: { type: GraphQLString }
  })
});

export const artist = {
  type: ArtistType,
  args: { artistId: { type: GraphQLInt } },
  resolve(_: unknown, args: Record<string, unknown>) {
    return ArtistData.find((artist) => artist.artistId === args.artistId);
  }
};

export const artists = {
  type: new GraphQLList(ArtistType),
  resolve() {
    return ArtistData;
  }
};
