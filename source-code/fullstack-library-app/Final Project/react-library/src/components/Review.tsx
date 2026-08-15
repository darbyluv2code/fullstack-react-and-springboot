import type { ReviewModel } from "../models/ReviewModel";
import { StarsReview } from "./StarsReview";

interface ReviewProps {
  review: ReviewModel;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const date = new Date(review.date);
  const longMonth = date.toLocaleString("en-us", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();
  const dateRender = `${longMonth} ${dateDay}, ${dateYear}`;

  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{review.userEmail}</h5>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarsReview rating={review.rating} size={16} />
          </div>
        </div>
        <div className="mt-2">
          <p>{review.reviewDescription ?? <em>No review description</em>}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
