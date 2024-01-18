import { CommentBody } from "../types/Comment.tsx";
import { Comment } from "../types/Comment.tsx";
import { Post } from "../types/Post.tsx";
import { validateComment } from "../validators/CommentValidator.tsx";
import { hasErrors } from "../validators/HelperFunctions.tsx";
import { GraphQLError } from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";

const kv = await Deno.openKv();

const addComment = async (commentBody: CommentBody) => {
  const errors = validateComment(commentBody);

  if (hasErrors(errors)) {
    throw new GraphQLError(JSON.stringify(errors));
  }

  const record = await kv.get(["post", Number.parseInt(commentBody.postId)]);
  const post = record.value as Post;
  const comments = post.comments || ([] as Comment[]);

  comments.push({
    author: commentBody.author,
    message: commentBody.message,
    createdAt: new Date(),
  });
  post.comments = comments;

  const postKey = ["post", post.id];
  await kv.set(postKey, post);

  return post;
};

export { addComment };
