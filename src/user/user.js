import express from "express";
import createHttpError from "http-errors";
import { JWTAuthMiddleware } from "../auth/token.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { UserModel } from "./model.js";
import multer from "multer";
import { JWTAuthenticate } from "../auth/tool.js";
import passport from "passport";
import { createJWT } from "../auth/auth.js";
import { ChatModel } from "../chat/model.js";

const userRoute = express.Router();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatar",
  },
});

userRoute.get(
  "/search/:searchReq",
  JWTAuthMiddleware,
  async (req, res, next) => {
    try {
      // res.send("Hello");
      const users = await UserModel.find();
      if (users) {
        res.send(users);
      } else {
        next(createHttpError(404, "Users not found!"));
      }
    } catch (error) {
      next(error);
    }
  }
);
userRoute.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    // res.send("Hello");
    const users = await UserModel.find();
    if (users) {
      res.send(users);
    } else {
      next(createHttpError(404, "Users not found!"));
    }
  } catch (error) {
    next(error);
  }
});
userRoute.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  // userRoute.get("/me", async (req, res, next) => {
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

userRoute.post(
  "/me/avatar",
  JWTAuthMiddleware,
  multer({ storage: cloudinaryStorage }).single("avatar"),
  async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user._id);
      user.avatar = req.file.path;
      await user.save();
      // const newAvatar = { cover: req.file.path };
      // const userWithAvatar = { ...user, ...newAvatar };
      res.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

userRoute.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (user) {
      res.send(user);
    } else {
      next(createHttpError(404, "User not found!"));
    }
  } catch (error) {
    next(error);
  }
});
userRoute.post("/account", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    const accessToken = await createJWT(newUser);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: (process.env.NODE_ENV = "production" ? true : false),
      sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: (process.env.NODE_ENV = "production" ? true : false),
      sameSite: "none",
    });
    res.send({ newUser, accessToken });
  } catch (error) {
    next(error);
  }
});

userRoute.post("/session", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.CheckCredentials(email, password);
    const chats = await ChatModel.find({
      "members._id": user._id,
    });
    if (user) {
      const { accessToken, refreshToken } = await createJWT(user);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        // secure: (process.env.NODE_ENV = "production" ? true : false),
        // sameSite: "none",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: (process.env.NODE_ENV = "production" ? true : false),
        // sameSite: "none",
      });
      res.send({ user: { user, chats }, accessToken });
    }
  } catch (error) {
    next(error);
  }
});

// usersRouter.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await UserSchema.checkCredentials(email, password);

//     if (user) {
//       const accessToken = await JWTAuthenticate(user);

//       res.send({ accessToken });
//     } else {
//       next(createHttpError(401, "Credentials are not ok!"));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

userRoute.delete("/session", JWTAuthMiddleware, async (req, res, next) => {
  try {
    req.user.refreshToken = null;
    await req.user.save();
    res.send("Ok");
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
userRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRoute.get(
  "/googleRedirect",
  passport.authenticate("google"),
  (req, res, next) => {
    // console.log(req.user); //*************************************************************************CONSOLE LOG HERE */
    res.redirect(
      `http://localhost:3000?accessToken=${req.user.token.accessToken}}`
    );
  }
);
export default userRoute;
