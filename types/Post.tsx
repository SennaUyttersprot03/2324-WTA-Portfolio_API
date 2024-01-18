import Comment from "./Comment.tsx";

export interface Post {
  id: number;
  title: string;
  message: string;
  comments: Comment[];
  createdAt: Date;
}

export interface PostBody {
  title: string;
  message: string;
}
