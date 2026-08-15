import { useEffect, useState } from "react";
import type { ShelfHistoryModel } from "../../../models/ShelfHistoryModel";
import { SpinnerLoading } from "../../../components/SpinnerLoading";
import { Pagination } from "../../../components/Pagination";
import { shelfService } from "../../../services/shelfService";

interface HistoryTabProps {
  isActive?: boolean;
}

export const HistoryTab = ({ isActive }: HistoryTabProps) => {
  const HISTORY_PER_PAGE = 5;

  const [history, setHistory] = useState<ShelfHistoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHistory, setTotalHistory] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setHttpError(null);
        const pageNo = currentPage - 1;
        const data = await shelfService.getHistory(pageNo, HISTORY_PER_PAGE);
        setHistory(data.content);
        setTotalHistory(data.page.totalElements);
        setTotalPages(data.page.totalPages);
      } catch (error) {
        setHttpError(
          error instanceof Error ? error.message : "An error has occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isActive) {
      fetchHistory();
    }
  }, [currentPage, isActive]);

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
      {totalHistory > 0 ? (
        <>
          <h5>Loan History: </h5>
          {history.map((historyEntry) => (
            <div
              key={historyEntry.id}
              className="card mt-3 shadow p-3 mb-3 bg-body rounded"
            >
              <div className="row g-0">
                <div className="col-md-2">
                  <img
                    src={historyEntry.img}
                    width="123"
                    height="196"
                    alt="Book"
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{historyEntry.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {historyEntry.author}
                    </h6>
                    <p className="card-text">{historyEntry.description}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="flex-column mt-3">
                      <div className="list-group list-group-flush">
                        <p className="list-group-item list-group-item-action active">
                          Loan Details:
                        </p>
                        <p className="list-group-item">
                          Checked out: {historyEntry.checkoutDate}
                        </p>
                        <p className="list-group-item">
                          Returned: {historyEntry.returnedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className="mt-3">Currently no loan history</h3>
          <p>Get started by checking out a book!</p>
          <a className="btn btn-primary" href="/search">
            Search for books
          </a>
        </>
      )}

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
