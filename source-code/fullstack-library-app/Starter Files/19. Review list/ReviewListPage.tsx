import { Link } from "react-router-dom";

export const ReviewListPage = () => {
  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="row mb-4">
        <div className="col-12">
          <Link to={`/checkout/<change_id>`} className="btn btn-primary">
            Back to Book Details
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row">
        <div className="col-12">
          <h3>All Reviews (1000000)</h3>
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        </div>
      </div>
    </div>
  );
};
