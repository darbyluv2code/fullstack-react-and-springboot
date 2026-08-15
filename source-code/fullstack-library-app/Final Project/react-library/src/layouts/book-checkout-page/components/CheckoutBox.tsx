import type { BookModel } from "../../../models/BookModel";
import { useAuth } from "../../../auth/AuthContext";
import { useEffect, useState } from "react";
import { bookService } from "../../../services/bookService";

interface CheckoutBoxProps {
  book: BookModel;
  onBookUpdate: (book: BookModel) => void;
}

export const CheckoutBox: React.FC<CheckoutBoxProps> = ({
  book,
  onBookUpdate,
}) => {
  const { isAuthenticated, login, initialized } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const totalCopies = book?.copies ?? 0;
  const availableCopies = book?.copiesAvailable ?? 0;
  const checkedOutCopies = totalCopies - availableCopies;

  useEffect(() => {
    const checkExistingCheckout = async () => {
      if (!initialized || !book?.id) {
        return;
      }

      if (!isAuthenticated) {
        setIsCheckedOut(false);
        setIsCheckingStatus(false);
        return;
      }

      try {
        const statusResponse = await bookService.checkCheckoutStatus(
          book.id.toString(),
        );
        setIsCheckedOut(statusResponse.isCheckedOut);
      } catch (error) {
        setIsCheckedOut(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkExistingCheckout();
  }, [initialized, isAuthenticated, book?.id]);

  const handleCheckout = async () => {
    if (!book?.id) {
      setError("Book information is missing");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedBook = await bookService.checkoutBook(book.id.toString());

      onBookUpdate(updatedBook);

      setIsCheckedOut(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to checkout book";

      if (errorMessage.includes("already checked out")) {
        setIsCheckedOut(true);
        setError(null);
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card d-flex mt-5 mb-5 col-12 col-lg-3">
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>
              {checkedOutCopies} / {totalCopies}
            </b>{" "}
            books checked out
          </p>
          <hr />
          {availableCopies > 0 ? (
            <h4 className="text-success"> Available </h4>
          ) : (
            <h4 className="text-danger"> Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{totalCopies}</b> copies
            </p>
            <p className="col-6 lead">
              <b>{availableCopies}</b> available
            </p>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        {!initialized || !book?.id ? (
          <button className="btn btn-secondary btn-lg" disabled>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading ...
          </button>
        ) : !isAuthenticated ? (
          <button className="btn btn-success btn-lg" onClick={login}>
            Sign in to Checkout
          </button>
        ) : isCheckingStatus ? (
          <button className="btn btn-secondary btn-lg" disabled>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Checking status ...
          </button>
        ) : isCheckedOut ? (
          <div className="alert alert-success text-center" role="alert">
            <i className="fas fa-check-cirle me-2"></i>
            <strong>Book Checked Out!</strong>
            <br />
            <small className="text-muted">
              You have successfully checked out this book.
            </small>
          </div>
        ) : (
          <button
            className={`btn btn-lg ${
              availableCopies > 0 ? "btn-success" : "btn-warning"
            }`}
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading
              ? "Checking out ..."
              : availableCopies > 0
                ? "Checkout Book"
                : "Join wait list"}
          </button>
        )}
        <hr />
        <p className="mt-3 text-muted small">
          {!isAuthenticated
            ? "This number can change until placing order has been complete."
            : isCheckedOut
              ? "You can return this book from your account page"
              : "Book availability updates in real-time"}
        </p>
        {!isAuthenticated && (
          <p className="text-muted small">
            {" "}
            Sign in to checkout books and leave reviews
          </p>
        )}
      </div>
    </div>
  );
};
