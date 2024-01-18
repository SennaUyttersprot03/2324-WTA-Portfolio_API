import { FreshContext } from "$fresh/server.ts";
import Post from "../types/Post.tsx";
import { validateComment } from "../validators/CommentValidator.tsx";
import { hasErrors } from "../validators/HelperFunctions.tsx";

const kv = await Deno.openKv();

const addComment = async (req: Request, ctx: FreshContext) => {
  const id = ctx.params.id;
  let body;

  try {
    body = await req.json();
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "An author and message are required" }),
      {
        status: 422,
      },
    );
  }
  const errors = validateComment(body);

  if (hasErrors(errors)) {
    return new Response(
      JSON.stringify({ message: "The given data was invalid", errors }),
      { status: 422 },
    );
  }

  const record = await kv.get(["post", Number.parseInt(id)]);
  const post = record.value as Post;
  const comments = post.comments || [] as Comment[];

  comments.push({ ...body, createdAt: new Date() });
  post.comments = comments;

  const postKey = ["post", post.id];
  await kv.set(postKey, post);

  return new Response(
    JSON.stringify({ message: "Comment successfully added", post }),
    { status: 201 },
  );
};

export { addComment };
