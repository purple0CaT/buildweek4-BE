import express from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { JWTAuthMiddleware } from "../auth/token.js";
import { ChatModel } from "./model.js";
import multer from "multer";

//
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "image",
  },
});
//
const chatRoute = express.Router();
chatRoute.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const chats = await ChatModel.find();
    if (chats) {
      res.send(chats);
    } else {
      next(createHttpError(404, "Users not found!"));
    }
  } catch (error) {
    next(error);
  }
});
chatRoute.post("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const newChat = new ChatModel(req.body);
    await newChat.save();
    res.send(newChat);
  } catch (error) {
    next(error);
  }
});
chatRoute.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const chat = await ChatModel.findById(req.params.id);
    res.send(chat);
  } catch (error) {
    next(error);
  }
});
chatRoute.post(
  "/:id/image",
  JWTAuthMiddleware,
  multer({ storage: cloudinaryStorage }).single("image"),
  async (req, res, next) => {
    try {
      const chat = await ChatModel.findById(req.params.id);
      chat.image = req.file.path;
      await chat.save();
      res.send(chat);
    } catch (error) {
      next(error);
    }
  }
);
export default chatRoute;
