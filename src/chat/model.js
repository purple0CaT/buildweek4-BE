import mongoose from "mongoose";
import { ChatSchema, MessageSchema } from "./schema.js";

export const ChatModel = mongoose.model("chat", ChatSchema);

export const MessageModel = mongoose.model("message", MessageSchema);
