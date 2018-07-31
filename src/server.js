import express from 'express'
import graphqlHTTP from 'express-graphql'
import  { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList } from 'graphql'

const app = express()

let video = {
    id: '1',
    title: 'Mattis ullamcorper velit sed ullamcorper',
    duration: 180,
    watched: false
}

let videos = [
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
    },
    {
        id: '4',
        title: 'Eu facilisis sed odio morbi',
        duration: 260,
        watched: true 
    },
    {
        id: '5',
        title: 'Egestas egestas fringilla phasellus',
        duration: 190,
        watched: false 
    },
    {
        id: '6',
        title: 'Pharetra massa massa ultricies',
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

app.all('*', (req, res) => {
    res.json({ok: true})
})

export default app