import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new PostModel({ creator: userId, prompt, tag });

    await newPrompt.save();

    console.log(newPrompt);

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }
};
