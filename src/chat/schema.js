import { Schema, model } from "mongoose";
import UserSchema from "../user/schema.js";

const ChatSchema = new Schema({
  members: [{ type: UserSchema }],
  // history:,
});
