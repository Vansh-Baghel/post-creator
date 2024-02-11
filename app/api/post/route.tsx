import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const posts = await PostModel.find({}).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
