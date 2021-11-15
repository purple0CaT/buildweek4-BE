import express from "express";
import { catchAllHandler, generalErrHandl } from "./errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import chatRoute from "./chat/chat.js";
import userRoute from "./user/user.js";
//
export const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer);

// passport.use("facebook", FBStrategy);
// passport.use("google", googleStrategy);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//************Router ****************
//
app.use("/users", userRoute);
app.use("/chats", chatRoute);
//
app.use(generalErrHandl);
app.use(catchAllHandler);
