import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ReviewModel } from "../../models/ReviewModel";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Review } from "../../components/Review";
import { Pagination } from "../../components/Pagination";
import { useAuth } from "../../auth/AuthContext";
import { ReviewForm } from "../../components/ReviewForm";

export const ReviewListPage = () => {
  const REVIEWS_PER_PAGE = 5;
  const { bookId } = useParams<{ bookId: string }>();
  const { isAuthenticated, user, login } = useAuth();
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) {
        setHttpError("Book ID is required");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const pageNo = currentPage - 1;
        const reviewsData = await bookService.getBookReviewsById(
          bookId,
          pageNo,
          REVIEWS_PER_PAGE
        );

        setReviews(reviewsData.content);
        setTotalReviews(reviewsData.page.totalElements);
        setTotalPages(reviewsData.page.totalPages);

        if (isAuthenticated && user?.email) {
          const userReview = reviewsData.content.find(
            (review) => review.userEmail === user.email
          );
          setHasUserReviewed(!!userReview);
        }

        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        setIsLoading(false);
        setHttpError(
          error instanceof Error ? error.message : "an error has occured"
        );
      }
    };

    fetchData();
  }, [bookId, currentPage, isAuthenticated, user?.email, refreshTrigger]);

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setHasUserReviewed(true);
    setCurrentPage(1);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleShowReviewForm = () => {
    setShowReviewForm(true);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  const indexOfFirstReview = (currentPage - 1) * REVIEWS_PER_PAGE + 1;
  const lastItem = Math.min(currentPage * REVIEWS_PER_PAGE, totalReviews);

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="row mb-4">
        <div className="col-12">
          <Link to={`/checkout/${bookId}`} className="btn btn-primary">
            Back to Book Details
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row">
        <div className="col-12">
          <h3>All Reviews ({totalReviews})</h3>

          {isAuthenticated && !hasUserReviewed && !showReviewForm && (
            <div className="mb-4">
              <button
                onClick={handleShowReviewForm}
                className="btn btn-primary"
              >
                {" "}
                Leave a review
              </button>
            </div>
          )}

          {isAuthenticated && hasUserReviewed && (
            <div className="alert alert-info mb-4">
              You have already reviewed this book.
            </div>
          )}

          {!isAuthenticated && (
            <div className="alert alert-warning mb-4">
              <button
                onClick={login}
                className="btn btn-link p-0 text-decoration-none"
                style={{ fontSize: "inherit" }}
              >
                Sign in
              </button>{" "}
              to leave a review
            </div>
          )}

          {showReviewForm && bookId && (
            <ReviewForm
              bookId={bookId}
              onReviewSubmitted={handleReviewSubmitted}
              onCancel={handleCancelReview}
            />
          )}

          {reviews.length > 0 ? (
            <>
              <p>
                {" "}
                {indexOfFirstReview} to {lastItem} of {totalReviews} reviews{" "}
              </p>

              {reviews.map((review) => (
                <Review review={review} key={review.id} />
              ))}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="m-3">
              <p className="lead">
                Currently there are no reviews for this book
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
