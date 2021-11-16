import createHttpError from "http-errors";
import { UserModel } from "../user/model.js";
import { verifyJWT } from "./auth.js";

export const JWTAuthMiddleware = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    next(
      createHttpError(401, "Please provide credentials in Authorization header")
    );
  } else {
    try {
      const token = req.cookies.accessToken;

      const decodedToken = await verifyJWT(token);

      // console.log("DECODED TOKEN ", decodedToken);

      const user = await UserModel.findById(decodedToken._id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(createHttpError(404, "User not found!"));
      }
    } catch (error) {
      next(createHttpError(401, "Token not valid!"));
    }
  }
};
