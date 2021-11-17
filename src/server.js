import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import passport from "passport";
import { Server } from "socket.io";
import googleStrategy from "./auth/oauth.js";
import authRouter from './auth/TEMPindexMarco.js';
import chatRoute from "./chat/chat.js";
import { catchAllHandler, generalErrHandl } from "./errorHandler.js";
import userRoute from "./user/user.js";
//
export const app = express();

// passport.use("facebook", FBStrategy);
passport.use("google", googleStrategy);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//************Router ****************
//
app.use("/auth", authRouter);   // MARCO's TEMP, JUST FOR TESTING
app.use("/users", userRoute);
app.use("/chats", chatRoute);
//
app.use(generalErrHandl);
app.use(catchAllHandler);
