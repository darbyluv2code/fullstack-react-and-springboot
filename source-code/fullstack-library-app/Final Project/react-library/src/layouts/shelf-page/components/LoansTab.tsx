import { useEffect, useState } from "react";
import type { ShelfCurrentLoansModel } from "../../../models/ShelfCurrentLoansModel";
import { SpinnerLoading } from "../../../components/SpinnerLoading";
import { shelfService } from "../../../services/shelfService";
import { Pagination } from "../../../components/Pagination";
import { LoanCard } from "./LoanCard";

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
        const pageNo = currentPage - 1;
        const data = await shelfService.getCurrentLoans(pageNo, LOANS_PER_PAGE);
        setLoans(data.content);
        setTotalLoans(data.page.totalElements);
        setTotalPages(data.page.totalPages);
      } catch (error) {
        setHttpError(
          error instanceof Error ? error.message : "An error has occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoans();
  }, [currentPage, refreshLoans]);

  const handleReturnBook = async (bookId: number) => {
    try {
      await shelfService.returnBook(bookId);
      setRefreshLoans((prev) => prev + 1);
    } catch (error) {
      setHttpError(
        error instanceof Error ? error.message : "Failed to return book."
      );
    }
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
        {totalLoans > 0 ? (
          <>
            <h5>Current Loans: </h5>
            {loans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                mobile={false}
                onReturnBook={handleReturnBook}
              />
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <a className="btn btn-primary" href="/search">
              Search for a new book
            </a>
          </>
        )}
      </div>

      <div className="d-lg-none mt-2">
        {totalLoans > 0 ? (
          <>
            <h5>Current Loans: </h5>
            {loans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                mobile={true}
                onReturnBook={handleReturnBook}
              />
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <a className="btn btn-primary" href="/search">
              Search for a new book
            </a>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
      )}
    </>
  );
};
