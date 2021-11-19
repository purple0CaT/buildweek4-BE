import mongoose from "mongoose";
import { UserSchema } from "../user/schema.js";

export const MessageSchema = new mongoose.Schema(
  {
    sender: { type: UserSchema },
    // content: { type: String },
    content: {
      text: { type: String },
      // media: { type: String },
    },
  },
  { timestamps: true }
);

export const ChatSchema = new mongoose.Schema({
  members: [{ type: Object, required: false }],
  name: { type: String },
  history: [{ type: MessageSchema }],
  image: { type: String },
});
