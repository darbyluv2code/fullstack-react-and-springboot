import { useState } from "react";
import { bookService } from "../services/bookService";

interface ReviewFormProps {
  bookId: string;
  onReviewSubmitted: () => void;
  onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  bookId,
  onReviewSubmitted,
  onCancel,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewDescription, setReviewDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await bookService.createReview({
        bookId: parseInt(bookId),
        rating: rating,
        reviewDescription: reviewDescription.trim() || undefined,
      });

      setRating(0);
      setReviewDescription("");
      onReviewSubmitted();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to submit review"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Leave a Review</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Rating *</label>
            <div className="d-flex align-items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    color: star <= rating ? "#ffc107" : "#e4e5e9",
                    marginRight: "4px",
                  }}
                >
                  ★
                </span>
              ))}
              <span className="ms-2">
                {rating > 0
                  ? `${rating} star${rating !== 1 ? "s" : ""}`
                  : "Click to rate"}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="reviewDescription" className="form-label">
              Review Description (Optional)
            </label>
            <textarea
              id="reviewDescription"
              className="form-control"
              rows={4}
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              placeholder="Share your thoughts about this book..."
              maxLength={1000}
              disabled={isSubmitting}
            />
            <div className="form-text">
              {reviewDescription.length}/1000 characters
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
