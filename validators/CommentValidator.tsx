import { CommentBody } from "../types/Comment.tsx";
import { isFilled } from "./HelperFunctions.tsx";

export const validateComment = (comment: CommentBody) => {
  const errors: { [key: string]: string } = {};

  if (!isFilled(comment.postId)) {
    errors.postId = "PostId is required";
  }
  if (!isFilled(comment.author)) {
    errors.author = "Author is required";
  }
  if (!isFilled(comment.message)) {
    errors.message = "Message is required";
  }

  return errors;
};
