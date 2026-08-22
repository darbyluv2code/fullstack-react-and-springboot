import BookModel from "../../models/BookModel";

const dummyBooks: BookModel[] = [
  {
    id: 1,
    author: "Author One",
    title: "Book Title One",
    description: "Description for book one.",
    img: require("../../Images/BooksImages/book-luv2code-1000.png"),
  },
  {
    id: 2,
    author: "Author Two",
    title: "Book Title Two",
    description: "Description for book two.",
    img: require("../../Images/BooksImages/book-luv2code-1000.png"),
  },
  {
    id: 3,
    author: "Author Three",
    title: "Book Title Three",
    description: "Description for book three.",
    img: require("../../Images/BooksImages/book-luv2code-1000.png"),
  },
];

export const SearchBooksPage = () => {
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
                />
                <button className="btn btn-outline-success">Search</button>
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
                  Category
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Number of results: (3)</h5>
          </div>

          <p>1 to 3 of 3 items:</p>

          {dummyBooks.map((dummyBook) => (
            <div
              className="card mt-3 shadow p-3 mb-3 bg-body rounded"
              key={dummyBook.id}
            >
              <div className="row g-0">
                <div className="col-md-2">
                  <div className="d-none d-lg-block">
                    {dummyBook.img ? (
                      <img
                        src={dummyBook.img}
                        width="123"
                        height="196"
                        alt={`Cover of ${dummyBook.title}`}
                      />
                    ) : (
                      <img
                        src={require("../../Images/BooksImages/book-luv2code-1000.png")}
                        width="123"
                        height="196"
                        alt="Book"
                      />
                    )}
                  </div>

                  <div className="d-lg-none d-flex justify-content-center align-items-center">
                    {dummyBook.img ? (
                      <img
                        src={dummyBook.img}
                        width="123"
                        height="196"
                        alt={`Cover of ${dummyBook.title}`}
                      />
                    ) : (
                      <img
                        src={require("../../Images/BooksImages/book-luv2code-1000.png")}
                        width="123"
                        height="196"
                        alt="Book"
                      />
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{dummyBook.author}</h5>
                    <h4>{dummyBook.title}</h4>
                    <p className="card-text">{dummyBook.description}</p>
                  </div>
                </div>

                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <a className="btn btn-md main-color text-white" href="#">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
