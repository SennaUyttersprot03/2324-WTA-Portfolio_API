import { addComment } from "../controllers/CommentController.tsx";
import {
  createPost,
  deletePostById,
  getAllPosts,
  postById,
} from "../controllers/PostController.tsx";
import { Post, PostBody } from "../types/Post.tsx";
import { CommentBody } from "../types/Comment.tsx";

export const resolvers = {
  Query: {
    posts: (_parent: Post, { term }: { term: string }) => getAllPosts(term),
    postById: (_parent: Post, { id }: { id: string }) => postById(id),
  },
  Mutation: {
    createPost: (_parent: Post, post: PostBody) => createPost(post),
    deletePost: (_parent: Post, { id }: { id: string }) => deletePostById(id),
    addComment: (_parent: Post, comment: CommentBody) => addComment(comment),
  },
};
