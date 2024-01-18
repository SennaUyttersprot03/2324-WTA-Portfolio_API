import { gql } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";

export const typeDefs = gql`
  type Query {
    posts: [Post]
    postById(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, message: String!): Post!
    deletePost(id: ID!): String!
    addComment(postId: ID!, author: String! message: String!): Post!
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
    author: String!
    message: String!
    createdAt: Date!
  }
`;
