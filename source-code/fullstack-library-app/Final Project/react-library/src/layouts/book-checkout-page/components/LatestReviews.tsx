import { Link } from "react-router-dom";
import { Review } from "../../../components/Review";
import type { ReviewModel } from "../../../models/ReviewModel";

interface LatestReviewsProp {
  reviews: ReviewModel[];
  bookId?: number;
}

export const LatestReviews: React.FC<LatestReviewsProp> = ({
  reviews,
  bookId,
}) => {
  return (
    <div className="row mt-5">
      <div className="col-12 col-lg-2">
        <h2>Latest Reviews:</h2>
      </div>
      <div className="col-12 col-lg-10">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((eachReview) => (
              <Review review={eachReview} key={eachReview.id} />
            ))}
            <div className="m-3">
              <Link
                type="button"
                className="btn main-color btn-md text-white"
                to={`/reviewlist/${bookId}`}
              >
                Read all reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
            <Link
              type="button"
              className="btn main-color btn-md text-white mt-2"
              to={`/reviewlist/${bookId}`}
            >
              Be the first to leave a review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
