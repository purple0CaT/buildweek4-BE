import mongoose from "mongoose";
import { app } from "./server.js";
import listEndpoints from "express-list-endpoints";
import { httpServer } from "./io.js";

const port = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongo");
  httpServer.listen(port);
  console.table(listEndpoints(app));
  console.log("Server 🚀 > ", port);
});
