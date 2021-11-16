// THIS FILE IS WAITING FOR NEXT ZOOM CALL, FOR UNDERSTANDING TOGETHER AGREED BEHAVIOUR ;)

import express from "express";
import passport from "passport";
import { UserModel } from "../user/model.js";
import { createJWT } from "./auth.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    // console.log("HERE");
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Missing credentials.");
      error.status = 400;
      throw error;
    }

    const user = await UserModel.CheckCredentials(email, password);

    if (!user) {
      const error = new Error("No email/password match.");
      error.status = 400;

      throw error;
    }

    const token = await createJWT({ id: user._id });

    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const author = await new UserModel(req.body).save();
    delete author._doc.password;

    const token = await createJWT({ id: author._id });

    res.send({ author, token });
  } catch (error) {
    console.log({ error });
    res.send(500).send({ message: error.message });
  }
});

authRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  (req, res, next) => {
    // console.log(req.user);
    res.cookie("accessToken", req.user.token.accessToken, {
      httpOnly: true,
      // secure: (process.env.NODE_ENV = "production" ? true : false),
      sameSite: "none",
    });
    res.cookie("refreshToken", req.user.token.refreshToken, {
      httpOnly: true,
      // secure: (process.env.NODE_ENV = "production" ? true : false),
      sameSite: "none",
    });
    res.redirect(
      `http://localhost:3000?accessToken=${req.user.token.accessToken}}`
    );
  }
);

export default authRouter;
