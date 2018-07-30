import Authors from './data/authors' 
import Posts from './data/posts'

// Here a simple schema is constructed without using the GraphQL query language. 
// e.g. using 'new GraphQLObjectType' to create an object type 

import {
    // These are the basic GraphQL types need in this tutorial
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    // This is used to create required fileds and arguments
    GraphQLNonNull,
    // This is the class we need to create the schema
    GraphQLSchema,
} from 'graphql'
import _ from 'lodash/collection'

// Types in GraphQL
// Basic types include ID, String, Int, Float and Boolean

// AuthorType
const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represent an author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
    })
})

// PostType
const PostType = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: function(post) {
                return _.find(Authors, a => a.id == post.author_id);
            }
        }
    })
})

// Root query is an entry point to GraphQL API
// This is the Root Query
// Here Root query is defined as BlogQueryRootType. name and description is self descriptive.
const BlogQueryRootType = new GraphQLObjectType({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: function() {
                return Authors
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            resolve: function() {
                return Posts
            }
        }
    })
})

// Defining a Schema
/*
Schema defines how you want the data in your application to be shaped and how you want the data to be related with each other. Schema defination affects the way data will be stored in your database(s). In schema defination you’ll also be defining what queries, mutations, and subscriptions that will be made available to the front-end displaying the data.
*/

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
    // If you need to create or updata a datasource, 
    // you use mutations. Note:
    // mutations will not be explored in this post.
    // mutation: BlogMutationRootType 
});

export default BlogAppSchema;