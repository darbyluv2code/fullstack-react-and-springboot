import { useState } from "react";
import type { MessageModel } from "../../../models/MessageModel";

interface AdminMessageProps {
  message: MessageModel;
  onRespond: (id: number, response: string) => Promise<void>;
}

export const AdminMessage = ({ message, onRespond }: AdminMessageProps) => {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) {
      setError("Response is required");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await onRespond(message.id, response.trim());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit response",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mt-2 shadow p-3 bg-body rounded">
      <h5>
        Case #{message.id}: {message.title}
      </h5>
      <h6>{message.userEmail}</h6>
      <p>{message.question}</p>
      <hr />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor={`response-${message.id}`} className="form-label">
            Response
          </label>
          <textarea
            id={`response-${message.id}`}
            className="form-control"
            rows={3}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Response"}
        </button>
      </form>
    </div>
  );
};
