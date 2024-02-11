import { Schema, model, models } from "mongoose";

const PostModelSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  prompt: {
    type: String,
    required: [true, "Text is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const PostModel = models.PostModel || model("PostModel", PostModelSchema);

export default PostModel;
