export const CheckoutBox = () => {
  return (
    <div className="card d-flex mt-5 mb-5 col-12 col-lg-3">
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>0/5 </b>
            books checked out
          </p>
          <hr />
          <h4 className="text-success">Available</h4>
          <div className="row">
            <p className="col-6 lead">
              <b>5</b> copies
            </p>
            <p className="col-6 lead">
              <b>5</b> available
            </p>
          </div>
        </div>
        <a href="#" className="btn btn-success btn-lg">
          Sign in
        </a>
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign in to be able to leave a review.</p>
      </div>
    </div>
  );
};
