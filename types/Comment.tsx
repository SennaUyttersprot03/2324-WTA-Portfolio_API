export interface Comment {
  author: string;
  message: string;
  createdAt: Date;
}

export interface CommentBody {
  postId: string;
  author: string;
  message: string;
}
