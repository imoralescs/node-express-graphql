import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType } from 'graphql'
import Authors from './data/authors' 
import Posts from './data/posts'
import { resolve } from 'path';
import { 
    getVideoById, 
    getVideos, 
    createVideo } from './helpers'

/*
 * Types
 */

//* VideoType
const VideoType = new GraphQLObjectType({
    name: 'Video',
    description: 'Represent a Video.',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Id of the video.'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video.'
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video.'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watch the video.'
        }
    }
})

//* AuthorType
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Represent a Author.',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Id of the author.'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Name of the author.'
        },
        twitterHandle: {
            type: GraphQLString,
            description: 'Twitter name account.'
        }
    }
})

//* PostType
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Represent a Post.',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Id of the post.'
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Title of the post.'
        },
        body: {
            type: GraphQLString,
            description: 'Body content of the post.'
        },
        author: {
            type: AuthorType,
            description: 'Author information from the post.',
            resolve: function(post) {
                return Authors.find(a => a.id == post.author_id)
            }
        }
    }
})

/*
 * Query
 */

//* Root Query
const query = new GraphQLObjectType({
    name: 'Query',
    description: 'Application Schema Query Root.',
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of all Authors.',
            resolve: function() {
                return Authors
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: 'List of all Posts.',
            resolve: function() {
                return Posts
            }
        },
        videos: {
            type: new GraphQLList(VideoType),
            description: 'List of all Videos.',
            resolve: getVideos
        },
        video: {
            type: VideoType,
            description: 'Single video.',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Id of the video.'
                }
            },
            resolve: (_, args) => {
                return getVideoById(args.id)
            }
        }
    })
})

/*
 * Mutation
 */

const VideoInputType = new GraphQLInputObjectType({
    name: 'VideoInput',
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The title of the video.'
        },
        duration: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The duration of the video (in seconds).'
        },
        watched: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Whether or not the video is released.'
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type.',
    fields: {
        createVideo: {
            type: VideoType,
            args: {
                // common used the word "input" instead "video"
                video : {
                    type: new GraphQLNonNull(VideoInputType)
                }
            },
            resolve: (_, args) => {
                return createVideo(args.video)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
});

export default schema;