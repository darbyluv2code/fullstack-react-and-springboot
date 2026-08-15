import type { ShelfCurrentLoansModel } from "../../../models/ShelfCurrentLoansModel";

type ConfirmReturnModalProps = {
  book: ShelfCurrentLoansModel;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};

export const ConfirmReturnModal: React.FC<ConfirmReturnModalProps> = ({
  book,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Return</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to return <strong>{book.title}</strong> by
              {book.author}?
            </p>
            <p className="text-muted">
              Once returned, this book will be available for other users to
              checkout.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
            >
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
