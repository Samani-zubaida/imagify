import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  const { user, token, backendUrl } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch all reviews from backend
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews`);
      setReviews(res.data);
    } catch (error) {
      toast.error("Failed to load reviews");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit new review
  const submitReview = async (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.warning("Review text cannot be empty");

    try {
      const res = await axios.post(
        `${backendUrl}/api/reviews`,
        { text, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([res.data, ...reviews]); // prepend new review
      setText("");
      setRating(5);
      toast.success("Review submitted");
    } catch (error) {
      toast.error("Failed to submit review");
      console.error(error);
    }
  };

  // Delete a review by ID
  const deleteReview = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r._id !== id));
      toast.success("Review deleted");
    } catch (error) {
      toast.error("Failed to delete review");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center items-center p-6 md:px-28 my-24 overflow-hidden"
    >
      <h1 className="text-4xl mb-2">Customer Testimonials</h1>
      <p className="mb-6">What our users are saying</p>

      {/* Review submission form for logged-in users */}
      {user && (
        <form
          onSubmit={submitReview}
          className="w-full max-w-lg mb-10 flex flex-col gap-3"
        >
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={assets.rating_star}
                alt={`${star} star`}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "opacity-100" : "opacity-30"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            className="border rounded p-3 w-full resize-none"
            rows={4}
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews list */}
      <div className="flex flex-wrap justify-center items-stretch gap-5 w-full">
        {reviews.length === 0 && (
          <p className="text-center w-full">No reviews yet. Be the first!</p>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col bg-white hover:scale-105 transition-all duration-300 gap-4 rounded-xl sm:py-10 sm:px-8 py-5 px-6 items-center max-w-xs shadow-md"
          >
            <img
              src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <h2 className="font-sans text-2xl">{reviews.text}</h2>
            <p className="font-light text-gray-600">{user.name}</p>
            <h1>{rating}</h1>

            <div className="flex">
              {Array(review.rating)
                .fill()
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.rating_star}
                    alt="star"
                    className="w-4 h-4"
                  />
                ))}
            </div>

            <p className="font-extralight text-center">{review.text}</p>

            {/* Delete button if the review belongs to the logged-in user */}
            {user?.id === review.user && (
              <button
                onClick={() => deleteReview(review._id)}
                className="text-sm text-red-500 mt-2 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
