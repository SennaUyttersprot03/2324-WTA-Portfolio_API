import { GQLError } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { CommentBody } from "../types/Comment.tsx";
import { Comment } from "../types/Comment.tsx";
import { Post } from "../types/Post.tsx";
import { validateComment } from "../validators/CommentValidator.tsx";
import { hasErrors } from "../validators/HelperFunctions.tsx";

const kv = await Deno.openKv();

const addComment = async (commentBody: CommentBody) => {
  const errors = validateComment(commentBody);

  if (hasErrors(errors)) {
    throw new GQLError(JSON.stringify(errors));
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
