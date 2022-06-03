import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { artist, artists } from './Artist.js';
import albums from './Album.js';
import songs from './Song.js';

const query = new GraphQLObjectType({
  name: 'query',
  fields: {
    artist,
    artists,
    albums,
    songs
  }
});

export default new GraphQLSchema({ query });
