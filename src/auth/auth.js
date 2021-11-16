import createHttpError from "http-errors";
import UserSchema from "../user/schema.js";
import jwt from "jsonwebtoken";

export const createJWT = async (user) => {
  const accessToken = await generateJWT({ _id: user._id });
  const refreshToken = await generateRefreshJWT({ _id: user._id });
  return { accessToken, refreshToken };
};
//  CREATE TOKEN
const generateJWT = (payload) => {
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );
};
//  CREATE REFRESH TOKEN
const generateRefreshJWT = (payload) => {
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET_REF,
      { expiresIn: "1w" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );
};
// Verify Token
export const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) rej(err);
      else res(decodedToken);
    })
  );
// Verify Refresh Token
export const verifyRefreshJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET_REF, (err, decodedToken) => {
      if (err) rej(err);
      else res(decodedToken);
    })
  );
// Create NEW tokens based on REFRESH TOKEN
export const createRefreshToken = async (cookieToken) => {
  const decodedToken = await verifyRefreshJWT(cookieToken);
  const user = await UserSchema.findById(decodedToken._id);
  if (!user) throw createHttpError(404, "User not found!");
  if (user.refreshToken === cookieToken) {
    const { accessToken, refreshToken } = await createJWT(user);
    return { accessToken, refreshToken };
  } else {
    throw createHttpError(401, "Token invalid");
  }
};