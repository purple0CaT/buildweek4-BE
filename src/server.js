import express from "express";
import { catchAllHandler, generalErrHandl } from "./errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
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
// server.use("/auth", authorizRoute);

// app.use("/user", userRoute);
// app.use("/login", loginRoute);
// app.use("/register", registerRoute);

// app.use("/accommodation", accommodationRouter);
//
app.use(generalErrHandl);
app.use(catchAllHandler);
