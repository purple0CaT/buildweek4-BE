import express from "express";
import { ChatSchema } from "./schema.js";

const chatRoute = express.Router();
chatRoute.get("/", async (req, res, next) => {
  try {
    const chats = await ChatSchema.findAll();
    if (chats) {
      return chats;
    } else {
      next(createHttpError(404, "Users not found!"));
    }
  } catch (error) {
    next(error);
  }
});
chatRoute.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
chatRoute.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
chatRoute.post("/:id/image", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default chatRoute;
