import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDB();

    const prompt = await PostModel.findById(params.id).populate("creator");

    if (!prompt) return new Response("PostModel Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request: any, { params }: any) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPostModel = await PostModel.findById(params.id);

    if (!existingPostModel) {
      return new Response("PostModel not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPostModel.prompt = prompt;
    existingPostModel.tag = tag;

    await existingPostModel.save();
    

    return new Response("Successfully updated the PostModels", { status: 200 });
  } catch (error) {
    return new Response("Error Updating PostModel", { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await PostModel.findByIdAndDelete(params.id);

    return new Response("PostModel deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
