import cookie from "cookie";
import { verifyJWT } from "../auth/auth.js";
import { UserModel } from "../user/model.js";

export const authoriseSocket = async (socket, next) => {
  try {
    const requestForm = cookie.parse(socket.handshake.headers.cookie);
    console.log(socket);
    const { accessToken } = requestForm;
    if (accessToken) {
      const { id } = await verifyJWT(accessToken);
      const user = await UserModel.findById(id);
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
