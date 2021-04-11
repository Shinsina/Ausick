const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/Author');
const Album = require('../models/album')
const Song = require('../models/song')


const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt,GraphQLSchema,
    GraphQLList,GraphQLNonNull, GraphQLFloat
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const BookType = new GraphQLObjectType({
    name: 'Book',
    //We are wrapping fields in the function as we dont want to execute this ultil
    //everything is inilized. For example below code will throw error AuthorType not
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt },
        author: {
        type: AuthorType,
        resolve(parent, args) {
            return Author.findById(parent.authorID);
        }
    }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({ authorID: parent.id });
            }
        }
    })
})

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    id: { type: GraphQLID },
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
    trackCount: { type: GraphQLInt },
    copyright: { type: GraphQLString },
    country: { type: GraphQLString },
    currency: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    primaryGenreName: { type: GraphQLString },
    songs:{
      type: new GraphQLList(SongType),
      resolve(parent,args){
          return Song.find({ collectionId: parent.collectionId });
      }
  }
  })
})

const SongType = new GraphQLObjectType ({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLID },
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
    trackTimeMillis: {type: GraphQLInt },
    country: { type: GraphQLString },
    currency: { type: GraphQLString },
    primaryGenreName: { type: GraphQLString },
    isStreamable: { type: graphql.GraphQLBoolean },
    album:{
      type: AlbumType,
      resolve(parent,args){
          //return Book.find({ authorID: parent.id });
          return Album.findOne({ collectionId: parent.collectionId })
      }
  }
  })
})
//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        album: {
          type: AlbumType,
          args: { id: { type: GraphQLID }},
          resolve(parent, args) {
            return Album.findById(args.id);
          }
        },
        albums: {
          type: new GraphQLList(AlbumType),
          resolve(parent, args) {
            return Album.find({})
          }
        },
        song: {
          type: SongType,
          args: { id: { type: GraphQLID }},
          resolve(parent, args) {
            return Song.findById(args.id);
          }
        },
        songs: {
          type: new GraphQLList(SongType),
          resolve(parent, args){
            return Song.find({})
          }
        },
        book: {
            type: BookType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument
                //by the user
                return Book.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }
        },

        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }
    }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAlbum: {
          type: AlbumType,
          args: {
            wrapperType: { type: new GraphQLNonNull(GraphQLString) },
            collectionType: { type: new GraphQLNonNull(GraphQLString) },
            artistId: { type: new GraphQLNonNull(GraphQLInt) },
            collectionId: { type: new GraphQLNonNull(GraphQLInt) },
            amgArtistId: { type: new GraphQLNonNull(GraphQLInt) },
            artistName: { type: new GraphQLNonNull(GraphQLString) },
            collectionName: { type: new GraphQLNonNull(GraphQLString) },
            collectionCensoredName: { type: new GraphQLNonNull(GraphQLString) },
            artistViewUrl: { type: new GraphQLNonNull(GraphQLString) },
            collectionViewUrl: { type: new GraphQLNonNull(GraphQLString) },
            artworkUrl60: { type: new GraphQLNonNull(GraphQLString) },
            artworkUrl100: { type: new GraphQLNonNull(GraphQLString) },
            collectionPrice: { type: new GraphQLNonNull(GraphQLFloat) },
            collectionExplicitness: { type: new GraphQLNonNull(GraphQLString) },
            trackCount: { type: new GraphQLNonNull(GraphQLInt) },
            copyright: { type: new GraphQLNonNull(GraphQLString) },
            country: { type: new GraphQLNonNull(GraphQLString) },
            currency: { type: new GraphQLNonNull(GraphQLString) },
            releaseDate: { type: new GraphQLNonNull(GraphQLString) },
            primaryGenreName: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(parent, args) {
            let album = new Album({
              wrapperType: args.wrapperType,
              collectionType: args.collectionType,
              artistId: args.artistId,
              collectionId: args.collectionId,
              amgArtistId: args.amgArtistId,
              artistName: args.artistName,
              collectionName: args.collectionName,
              collectionCensoredName: args.collectionCensoredName,
              artistViewUrl: args.artistViewUrl,
              collectionViewUrl: args.collectionViewUrl,
              artworkUrl60: args.artworkUrl60,
              artworkUrl100: args.artworkUrl100,
              collectionPrice: args.collectionPrice,
              collectionExplicitness: args.collectionExplicitness,
              trackCount: args.trackCount,
              copyright: args.copyright,
              country: args.country,
              currency: args.currency,
              releaseDate: args.releaseDate,
              primaryGenreName: args.primaryGenreName
            });
            return album.save();
          }
        },
        addSong: {
          type: SongType,
          args: {
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
              trackTimeMillis: {type: GraphQLInt },
              country: { type: GraphQLString },
              currency: { type: GraphQLString },
              primaryGenreName: { type: GraphQLString },
              isStreamable: { type: graphql.GraphQLBoolean },
          },
          resolve(parent, args) {
            let song = new Song({
              wrapperType: args.wrapperType,
              kind: args.kind,
              artistId: args.artistId,
              collectionId: args.collectionId,
              trackId: args.trackId,
              artistName: args.artistName,
              collectionName: args.collectionName,
              trackName: args.trackName,
              collectionCensoredName: args.collectionCensoredName,
              trackCensoredName: args.trackCensoredName,
              artistViewUrl: args.artistViewUrl,
              collectionViewUrl: args.collectionViewUrl,
              trackViewUrl: args.trackViewUrl,
              previewUrl: args.previewUrl,
              artworkUrl30: args.artworkUrl30,
              artworkUrl60: args.artworkUrl60,
              artworkUrl100: args.artworkUrl100,
              collectionPrice: args.collectionPrice,
              trackPrice: args.trackPrice,
              releaseDate: args.releaseDate,
              collectionExplicitness: args.collectionExplicitness,
              trackExplicitness: args.trackExplicitness,
              discCount: args.discCount,
              discNumber: args.discNumber,
              trackCount: args.trackCount,
              trackNumber: args.trackNumber,
              trackTimeMillis: args.trackTimeMillis,
              country: args.country,
              currency: args.currency,
              primaryGenreName: args.primaryGenreName,
              isStreamable: args.isStreamable,
            });
            return song.save();
          }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                pages: { type: new GraphQLNonNull(GraphQLInt)},
                authorID: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    pages:args.pages,
                    authorID:args.authorID
                })
                return book.save()
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
