import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { app, httpServer, io } from "./server.js";
// process.env.TS_NODE_DEV && require("dotenv").config();
const port = process.env.PORT || 3003;
//
io.on("connection", (socket) => {
  connect;
});
//
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongo");
  httpServer.listen(port);
  console.table(listEndpoints(app));
  console.log("Server 🚀 > ", port);
});
//
// mongoose.connect(process.env.MONGO_URL);
// mongoose.connection.on("connected", () => {
//   console.log("Successfully connected to mongoDB 🚀");
//   app.listen(port, () => {
//   });
// });
// mongoose.connection.on("error", (err) => {
//   console.log("Mongo ERROR", err);
// });
// app.on("error", (err) => {
//   console.error("Server crashed due to ", err);
// });
