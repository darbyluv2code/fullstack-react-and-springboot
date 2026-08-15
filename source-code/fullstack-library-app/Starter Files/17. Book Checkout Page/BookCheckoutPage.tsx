export const BookCheckoutPage = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img
              src={"/images/book-images/book-1.png"}
              width="226"
              height="349"
              alt="Book"
            />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>Luv2code Title</h2>
              <h5 className="text-primary">Luv2code Author</h5>
              <p className="lead">Luv2code Description</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      {/* Mobile View */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={"/images/book-images/book-1.png"}
            width="226"
            height="349"
            alt="Book"
          />
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>Luv2code Title</h2>
            <h5 className="text-primary">Luv2code Author</h5>
            <p className="lead">Luv2code Description</p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};
