import mongoose from "mongoose";
import { ChatSchema } from "./schema.js";

export const ChatModel = mongoose.model("chat", ChatSchema);
