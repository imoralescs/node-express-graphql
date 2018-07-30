import express from 'express'
import  { buildSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'

const app = express()

//- buildSchema - Object from graphql to create a schema.
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

//- root - Provides a resolver function for each API endpoint
let root = {
    video: {
        id: () => '1',
        title: () => 'Mattis ullamcorper velit sed ullamcorper',
        duration: () => 180,
        watched: () => false
    }
}

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