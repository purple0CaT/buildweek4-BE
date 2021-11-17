import { Server } from "socket.io";
import { ChatModel } from "./chat/model.js";
import { MessageSchema } from "./chat/schema.js";
import { app } from "./server.js";
import { authoriseSocket } from "./socketMiddlewares/authoriseSocket.js";
import { createServer } from "http";
import { UserModel } from "./user/model.js";
//
export const httpServer = createServer(app);
export const io = new Server(httpServer);
//
//
io.use(authoriseSocket);

io.on("connection", async (socket) => {
  const chats = await ChatModel.find({
    "members._id": socket.user._id,
  });
  const mapped = chats.map((chat) => {
    socket.join(chat._id);
    socket.emit("join", chat._id);
  });
  console.log(socket.user);

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
  socket.on("disconnect", async () => {
    console.log("disconnected socket " + socket.id);
    const user = await UserModel.findById(socket.user._id);
    user.socket = null;
    await user.save();
  });
});
//
// mongoose.connect(process.env.MONGO_URL).then(() => {
//   console.log("connected to mongo");
//   httpServer.listen(port);
//   console.table(listEndpoints(app));
//   console.log("Server 🚀 > ", port);
// });

// io.use
// socket has headers that can have the jwt attached
// add socket.user
// io.sockets.sockets
// key pairs with {“128376hd”:SocketObject}
// https://socket.io/docs/v3/emit-cheatsheet/
//  if i didn't send previous message, create a room, if i did sent to already created room
//io.rooms
