import mongoose from "mongoose";
import { UserSchema } from "../user/schema.js";

export const MessageSchema = new mongoose.Schema(
  {
    sender: [{ type: UserSchema }],
    content: {
      text: { type: String },
      media: { type: String },
    },
  },
  { timestamps: true }
);

export const ChatSchema = new mongoose.Schema({
  members: [{ type: UserSchema }],
  name: { type: String },
  history: [{ type: MessageSchema }],
  image: { type: String },
  userOnline: [{ type: UserSchema }],
});
