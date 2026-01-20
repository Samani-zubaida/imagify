import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import { userAuth } from "../middleware/auth.js";

const reviewRouter = express.Router();

// Get all reviews
reviewRouter.get("/", getAllReviews);

// Create a new review (only for logged-in users)
reviewRouter.post("/", userAuth, createReview);

// Delete a review (only if it's the user's own review)
reviewRouter.delete("/:id", userAuth, deleteReview);

export default reviewRouter;
