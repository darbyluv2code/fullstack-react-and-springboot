import { useEffect, useState } from "react";
import type { BookModel } from "../../models/BookModel";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { CheckoutBox } from "./components/CheckoutBox";
import type { ReviewModel } from "../../models/ReviewModel";
import { LatestReviews } from "./components/LatestReviews";
import { StarsReview } from "../../components/StarsReview";

export const BookCheckoutPage = () => {
  const bookId = window.location.pathname.split("/")[2];
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  const handleBookUpdate = (updatedBook: BookModel) => {
    setBook(updatedBook);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const [bookData, reviewsData, rating] = await Promise.all([
          bookService.getBookById(bookId),
          bookService.getBookReviewsById(bookId),
          bookService.getBookAverageRating(bookId),
        ]);
        setBook(bookData);
        setReviews(reviewsData.content);
        setAverageRating(rating);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
    };
    fetchBook();
  }, [bookId]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <>
      {/* Desktop View */}
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img src={book?.img} width="226" height="349" alt="Book" />
            <div className="mt-2">
              <StarsReview rating={averageRating} size={20} />
            </div>
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
            </div>
          </div>
          <CheckoutBox book={book!} onBookUpdate={handleBookUpdate} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} />
      </div>
      {/* Mobile View */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={book?.img} width="226" height="349" alt="Book" />
          <div className="mt-2">
            <StarsReview rating={averageRating} size={20} />
          </div>
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
          </div>
        </div>
        <CheckoutBox book={book!} onBookUpdate={handleBookUpdate} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} />
      </div>
    </>
  );
};
