import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { MessageSchema } from "./chat/schema.js";
import { app, httpServer, io } from "./server.js";
// process.env.TS_NODE_DEV && require("dotenv").config();
const port = process.env.PORT || 3003;
//
io.on("connection", (socket) => {
  console.log(socket.id);
  // connect;
  /////////////////////////////////////////////////
  socket.on("loggedin", async () => {});
  /////////////////////////////////////////////////
  socket.on("sendmessage", async ({ message, room, user }) => {
    socket.join(room);
    const newMessage = new MessageSchema(message);
    await ChatModel.findOneAndUpdate(
      { room },
      {
        $push: { history: newMessage },
      }
    );
    socket.to(room).emit("message", newMessage);
  });

  //////////////////////////////////////////////////
  socket.on("disconnect", () => {
    console.log("disconnected socket " + socket.id);

    shared.onlineUsers = shared.onlineUsers.filter(
      (user) => user.socketId !== socket.id
    );
  });
});
//
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongo");
  httpServer.listen(port);
  console.table(listEndpoints(app));
  console.log("Server 🚀 > ", port);
});
