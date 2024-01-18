///<reference lib="deno.unstable" />
import { Post, PostBody } from "../types/Post.tsx";
import { validatePost } from "../validators/PostValidator.tsx";
import { hasErrors } from "../validators/HelperFunctions.tsx";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";

const kv = await Deno.openKv();

const getAllPosts = async (term: string) => {
  const records = kv.list({ prefix: ["post"] });
  const posts: Post[] = [];
  for await (const record of records) {
    posts.push(record.value as Post);
  }

  if (term) {
    term = term.toLowerCase();
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.message.toLowerCase().includes(term),
    );
    return filteredPosts;
  }

  return posts;
};

const createPost = async (postBody: PostBody) => {
  const errors = validatePost(postBody);

  if (hasErrors(errors)) {
    throw new GQLError(JSON.stringify(errors));
  }

  const post = { ...postBody, id: Date.now(), createdAt: new Date() };

  const postKey = ["post", post.id];
  await kv.set(postKey, post);

  const url = Deno.env.get("JAMSTACK_URL") as string;
  await fetch(url);

  return post;
};

const postById = async (id: string) => {
  const record = await kv.get(["post", Number.parseInt(id)]);
  const post = record.value as Post;

  if (!post) {
    throw new GQLError(JSON.stringify({ message: "Post not found" }));
  }
  return post;
};

const deletePostById = async (id: string) => {
  await kv.delete(["post", Number.parseInt(id)]);

  const url = Deno.env.get("JAMSTACK_URL") as string;
  await fetch(url);

  return JSON.stringify({ message: "Post successfully deleted" });
};

export { createPost, deletePostById, getAllPosts, postById };
