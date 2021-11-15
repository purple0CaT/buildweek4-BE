import express from "express";

const userRoute = express.Router();

userRoute.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.get("/me", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.put("/me", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.post("/me/avatar", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.post("/account", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.post("/session", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRoute.delete("/session", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
// ?
userRoute.post("/session/refresh", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default userRoute;
