import cookie from "cookie";
import { verifyJWT } from "../auth/auth.js";
import { UserModel } from "../user/model.js";

export const authoriseSocket = async (socket, next) => {
  // const token = socket.handshake;
  // console.log("Header =>", token);
  try {
    // console.log("Middleware =>", socket.id);
    const accessToken = socket.handshake.auth.accessToken;
    // const requestForm = cookie.parse(socket.handshake.headers.cookie);
    // const { accessToken } = requestForm;
    if (accessToken) {
      const { _id } = await verifyJWT(accessToken);
      const user = await UserModel.findById(_id);
      console.log(user);
      if (user) {
        user.socket = socket.id;
        await user.save();
        socket.user = user;
        next();
      } else {
        next(new Error("Totally not cool"));
      }
    } else {
      next(new Error("Completely not cool"));
    }
  } catch (error) {
    next(new Error("Still not cool"));
  }
};
