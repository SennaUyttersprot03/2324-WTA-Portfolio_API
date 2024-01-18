import { gql } from "https://deno.land/x/graphql_tag@0.1.2/mod.ts";

export const typeDefs = gql`
  type Query {
    posts: [Post]
    postById(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, message: String!): Post!
    deletePost(id: ID!): String!
  }

  scalar Date

  type Post {
    id: ID!
    title: String!
    message: String!
    comments: [Comment]
    createdAt: Date!
  }

  type Comment {
    id: ID!
    message: String!
    createdAt: Date!
  }
`;