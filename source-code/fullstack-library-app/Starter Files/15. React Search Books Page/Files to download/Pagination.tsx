type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage > totalPages - 2) {
      start = Math.max(1, totalPages - (maxPagesToShow - 1));
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            aria-label="First Page"
          >
            First
          </button>
        </li>
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            &laquo;
          </button>
        </li>
        {pageNumbers[0] > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item${currentPage === number ? " active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => paginate(number)}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        <li
          className={`page-item${
            currentPage === totalPages ? " disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            &raquo;
          </button>
        </li>
        <li
          className={`page-item${
            currentPage === totalPages ? " disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last Page"
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};
