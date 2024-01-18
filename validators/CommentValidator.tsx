import Comment from "../types/Comment.tsx";
import { isFilled } from "./HelperFunctions.tsx";

export const validateComment = (comment: Comment) => {
  const errors = {} as Comment;

  if (!isFilled(comment.author)) {
    errors.author = "Author is required";
  }
  if (!isFilled(comment.message)) {
    errors.message = "Message is required";
  }

  return errors;
};
