import { useEffect, useState } from "react";
import type { ShelfCurrentLoansModel } from "../../../models/ShelfCurrentLoansModel";
import { SpinnerLoading } from "../../../components/SpinnerLoading";

export const LoansTab = () => {
  const LOANS_PER_PAGE = 5;

  const [loans, setLoans] = useState<ShelfCurrentLoansModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [refreshLoans, setRefreshLoans] = useState(0);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setIsLoading(true);
        setHttpError(null);
      } catch (error) {
        setHttpError(
          error instanceof Error ? error.message : "An error has occurred.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoans();
  }, [currentPage, refreshLoans]);

  const handleReturnBook = async (bookId: number) => {
    return;
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <>
      <div className="d-none d-lg-block">
        <>
          <h3 className="mt-3">Currently no loans</h3>
          <a className="btn btn-primary" href="/search">
            Search for a new book
          </a>
        </>
      </div>

      <div className="d-lg-none mt-2">
        <>
          <h3 className="mt-3">Currently no loans</h3>
          <a className="btn btn-primary" href="/search">
            Search for a new book
          </a>
        </>
      </div>
    </>
  );
};
