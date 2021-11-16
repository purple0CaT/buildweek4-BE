import mongoose from "mongoose";
import { UserSchema } from "./schema.js";

export const UserModel = mongoose.model("users", UserSchema);
