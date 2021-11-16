import express from "express";
import createHttpError from "http-errors";
import { JWTAuthMiddleware } from "../auth/token.js";
import UserModel from './schema.js'
import passport from 'passport'

const userRoute = express.Router();

userRoute.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.findAll();
    if (users) {
      return users;
    } else {
      next(createHttpError(404, "Users not found!"));
    }
  } catch (error) {
    next(error);
  }
});
userRoute.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});
userRoute.put("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const modifiedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    res.send(modifiedUser);
  } catch (error) {
    next(error);
  }
});
userRoute.post("/me/avatar", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.post("/account", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.post("/session", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.delete("/session", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
// ?
userRoute.post("/session/refresh", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.get("/googleLogin",passport.authenticate("google",{scope:["profile","email"]}))
userRoute.get("/googleRedirect",passport.authenticate("google"),(req,res,next)=>{
      console.log(req.user) //*************************************************************************CONSOLE LOG HERE */
    res.redirect(`http://localhost:3000?accessToken=${req.user.token}}`)
})
export default userRoute;
