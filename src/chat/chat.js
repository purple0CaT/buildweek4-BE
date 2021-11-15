import express from "express";

const chatRoute = express.Router();
chatRoute.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
chatRoute.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
chatRoute.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
chatRoute.post("/:id/image", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default chatRoute;
