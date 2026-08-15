import { useState } from "react";
import type { ShelfCurrentLoansModel } from "../../../models/ShelfCurrentLoansModel";
import { ConfirmReturnModal } from "./ConfirmReturnModal";

type LoanCardProps = {
  loan: ShelfCurrentLoansModel;
  mobile: boolean;
  onReturnBook: (bookId: number) => Promise<void>;
};

export const LoanCard: React.FC<LoanCardProps> = ({
  loan,
  mobile,
  onReturnBook,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleReturnClick = () => {
    setShowModal(true);
  };

  const handleConfirmReturn = async () => {
    await onReturnBook(loan.id);
    setShowModal(false);
  };

  const handleCancelReturn = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
        <div className="row g-0">
          <div className={mobile ? "col-12" : "col-md-2"}>
            <img
              src={loan.img}
              width="226"
              height="349"
              alt="Book"
              className="img-fluid rounded-start"
            />
          </div>
          <div className={mobile ? "col-12" : "col-md-6"}>
            <div className="card-body">
              <h5 className="card-title">{loan.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{loan.author}</h6>
              <p className="card-text">{loan.description}</p>
            </div>
          </div>
          <div className={mobile ? "col-12" : "col-md-4"}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="flex-column mt-3">
                <div className="list-group list-group-flush">
                  <p className="list-group-item list-group-item-action active">
                    Loan Options:
                  </p>
                  <p className="list-group-item">Due Date: {loan.returnDate}</p>
                  <p className="list-group-item">Days left: {loan.daysLeft}</p>
                </div>
                <hr />
                <div className="list-group mt-3">
                  <button
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                    onClick={handleReturnClick}
                  >
                    Return Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ConfirmReturnModal
          book={loan}
          onConfirm={handleConfirmReturn}
          onCancel={handleCancelReturn}
        />
      )}
    </>
  );
};
