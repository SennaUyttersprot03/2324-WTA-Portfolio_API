import { createPost, deletePostById, getAllPosts, postById } from "../controllers/PostController.tsx";
import { PostBody } from "../types/Post.tsx";

export const resolvers = {
    Query: {
        posts: () => getAllPosts(),
        postById: (_parent: any, { id }: { id: string }) => postById(id),
    },
    Mutation: {
        createPost: (_parent: any, post: PostBody) => createPost(post),
        deletePost: (_parent: any, { id }: { id: string }) => deletePostById(id),
    }
};