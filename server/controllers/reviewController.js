import Review from "../models/Review.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { text, rating } = req.body;
    console.log("Authenticated user:", req.user);


    if (!text || !rating) {
      return res.status(400).json({ message: "Text and rating are required." });
    }

    const newReview = new Review({
      user: req.user.id,
      username: req.user.username,
      text,
      rating,
    });

    const savedReview = await newReview.save();
    console.log(savedReview);
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: "Failed to create review" });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};
