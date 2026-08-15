export const ReviewForm = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Leave a Review</h5>
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Rating *</label>
            <div className="d-flex align-items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#e4e5e9",
                    marginRight: "4px",
                  }}
                >
                  ★
                </span>
              ))}
              <span className="ms-2">"Click to rate"</span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="reviewDescription" className="form-label">
              Review Description (Optional)
            </label>
            <textarea
              id="reviewDescription"
              placeholder="Share your thoughts about this book..."
            />
            <div className="form-text">/1000 characters</div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              "Submit Review"
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
