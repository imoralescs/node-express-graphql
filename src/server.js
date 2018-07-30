import express from 'express'
import  { buildSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'

// Declare an app from express
const app = express()

//-- Part 1
/*
//- buildSchema - Object from graphql to create a schema.
let schema = buildSchema(`
    type Query {
        postTitle: String,
        blogTitle: String
    }
`)

//- root - Provides a resolver function for each API endpoint
let root = {
    postTitle: () => {
        return 'Build a simple server'
    },
    blogTitle: () => {
        return 'Web blog'
    }
}

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/

//-- Part 2 
//- Types in GraphQL
// Basic types include ID, String, Int, Float and Boolean
/*
let schema = buildSchema(`
    type Query {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }
`)

let root = {
    id: () => '1',
    title: () => 'Mattis ullamcorper velit sed ullamcorper',
    duration: () => 180,
    watched: () => false
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/

//-- Part 3
// Object type 
/*
let schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }

    type Query {
        video: Video
    }
`)

let root = {
    video: () => ({
        id: '1',
        title: 'Mattis ullamcorper velit sed ullamcorper',
        duration: 180,
        watched: false
    })
}

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/
// You can execute this query
/*
{
    video {
        id
        title
        duration 
        watched
    }
}
*/

//-- Part 4
// List type 
// We using brackets
/*
let schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }

    type Query {
        video: Video
        videos: [Video]
    }
`)

const video = {
    id: '1',
    title: 'Mattis ullamcorper velit sed ullamcorper',
    duration: 180,
    watched: false
}

const videos = [
    {
        id: '1',
        title: 'Mattis ullamcorper velit sed ullamcorper',
        duration: 180,
        watched: false 
    },
    {
        id: '2',
        title: 'Habitasse platea dictumst vestibulum',
        duration: 240,
        watched: true 
    }
]

let root = {
    video: () => video,
    videos: () => videos
}

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/

/*
{
  videos {
    id
    title
    duration 
    watched
  }
}
*/

//-- Part 5
// graphqlHTTP express-graphql
// schema
// graphiql
// rootValue

//-- Part 6
// Build our schema with JavaScript 
// Before we are using buildSchema function and passing a template literal to build our schema
// Now we are trying to build the same schema with JavaScript
/*
import  { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean } from 'graphql'

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Id of the video'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watch the video'
        }
    }
})  

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise((resolve) => {
                resolve({
                    id: '1',
                    title: 'Mattis ullamcorper velit sed ullamcorper',
                    duration: 180,
                    watched: false
                })
            })
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
})

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/
/*
{
  video {
    id
    title
    duration 
    watched
  }
}
*/

//-- Part 7
// Use arguments in graphql to find by specify
/*
import  { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean } from 'graphql'

// Collections
const videos = [
    {
        id: '1',
        title: 'Mattis ullamcorper velit sed ullamcorper',
        duration: 180,
        watched: false 
    },
    {
        id: '2',
        title: 'Habitasse platea dictumst vestibulum',
        duration: 240,
        watched: true 
    }
]

// Helper for find element on video
const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id === id
    })
    
    resolve(video)
})

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Id of the video'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watch the video'
        }
    }
})  

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            // For used arguments
            args: {
                id: {
                    type: GraphQLID,
                    description: 'Id of the video'
                }
            },
            // We include args we define step before
            resolve: (_, args) => {
                return getVideoById(args.id)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
})

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/
/*
# Query 1
{
  video(id: "1") {
    title
    duration 
    watched
  }
}

# Query 2
{
  video(id: "2") {
    title
    duration 
    watched
  }
}
*/

//-- Part 8
// Use GraphQLNull for required field
// Avoid return null when you search by empty ID
/*
import  { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull } from 'graphql'

// Collections
const videos = [
    {
        id: '1',
        title: 'Mattis ullamcorper velit sed ullamcorper',
        duration: 180,
        watched: false 
    },
    {
        id: '2',
        title: 'Habitasse platea dictumst vestibulum',
        duration: 240,
        watched: true 
    }
]

// Helper for find element on video
const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id === id
    })
    
    resolve(video)
})

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Id of the video'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watch the video'
        }
    }
})  

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            // For used arguments
            args: {
                id: {
                    // Used id is required
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Id of the video'
                }
            },
            // We include args we define step before
            resolve: (_, args) => {
                return getVideoById(args.id)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
})

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/

/*
# Query 1
{
  video(id: "1") {
    title
    duration 
    watched
  }
}

# Query 2
{
  video(id: "2") {
    title
    duration 
    watched
  }
}
*/

//-- Part 9
// In ours previuos we exposed one single item, but
// now we want to exposed all item

import  { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList } from 'graphql'

// Collections
const videos = [
    {
        id: '1',
        title: 'Mattis ullamcorper velit sed ullamcorper',
        duration: 180,
        watched: false 
    },
    {
        id: '2',
        title: 'Habitasse platea dictumst vestibulum',
        duration: 240,
        watched: true 
    },
    {
        id: '3',
        title: 'Urna et pharetra pharetra massa massa',
        duration: 160,
        watched: false 
    }
]

// Helper for find element on video
const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id === id
    })
    
    resolve(video)
})

// Helper to get all video
const getVideos = () => new Promise((resolve) => resolve(videos))

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Id of the video'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watch the video'
        }
    }
})  

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos
        },
        video: {
            type: videoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Id of the video'
                }
            },
            resolve: (_, args) => {
                return getVideoById(args.id)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
})

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))

/*
{
  videos {
    title
    duration 
    watched
  }
}
*/

// Full app
/*
import schema from './schema'

// Graphql router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true // Set to false if you dont want graphiql enabled
}))
*/

//
/* 
query getAllPost {
  posts {
    id
    title
    author {
      name
    }
  }
}
*/

// Catch all or 404
app.all('*', (req, res) => {
    res.json({ok: true})
})

export default app