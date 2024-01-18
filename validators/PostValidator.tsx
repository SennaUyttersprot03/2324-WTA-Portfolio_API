import { PostBody } from "../types/Post.tsx";
import { isFilled } from "./HelperFunctions.tsx";

export function validatePost(post: PostBody) {
  const errors = {} as PostBody;
  if (!isFilled(post.title)) {
    errors.title = "Title is required";
  }

  if (!isFilled(post.message)) {
    errors.message = "Message required";
  }

  return errors;
}
