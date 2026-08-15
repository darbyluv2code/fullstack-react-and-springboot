import React, { useCallback, useEffect, useState } from "react";
import type { BookModel } from "../../models/BookModel";
import { SearchBook } from "./components/SearchBook";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Pagination } from "../../components/Pagination";

export const SearchBooksPage = () => {
  const BOOKS_PER_PAGE = 5;
  const CATEGORIES = [
    { label: "All", value: "All" },
    { label: "Front End", value: "FE" },
    { label: "Back End", value: "BE" },
    { label: "Data", value: "Data" },
    { label: "DevOps", value: "DevOps" },
  ] as const;

  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const pageNo = currentPage - 1;
        let data;
        if (searchTerm) {
          data = await bookService.searchBooksByTitle(
            searchTerm,
            pageNo,
            BOOKS_PER_PAGE
          );
        } else if (selectedCategory !== "All") {
          data = await bookService.searchBooksByCategory(
            selectedCategory,
            pageNo,
            BOOKS_PER_PAGE
          );
        } else {
          data = await bookService.getBooks(pageNo, BOOKS_PER_PAGE);
        }

        setBooks(data.content);
        setTotalBooks(data.page.totalElements);
        setTotalPages(data.page.totalPages);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        setIsLoading(false);
        setHttpError(
          error instanceof Error ? error.message : "An error has occured."
        );
      }
    };
    fetchBooks();
  }, [currentPage, searchTerm, selectedCategory]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setSearchTerm(searchInput);
    setSelectedCategory("All");
  }, [setCurrentPage, searchInput]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleCategorySelect = useCallback(
    (value: string) => {
      setCurrentPage(1);
      setSelectedCategory(value);
      setSearchTerm("");
      setSearchInput("");
    },
    [setCurrentPage]
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  const indexOfFirstBook = (currentPage - 1) * BOOKS_PER_PAGE + 1;
  const lastItem = Math.min(currentPage * BOOKS_PER_PAGE, totalBooks);

  return (
    <>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCategory}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {CATEGORIES.map((cat) => (
                    <li
                      key={cat.value}
                      onClick={() => handleCategorySelect(cat.value)}
                    >
                      <a className="dropdown-item" href="#">
                        {cat.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of results: ({totalBooks})</h5>
          </div>
          <p>
            {indexOfFirstBook} to {lastItem} of {totalBooks} items:
          </p>
          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
