import { useState } from "react";
import { messageService } from "../../../services/messageService";

export const SubmitQuestion = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !question.trim()) {
      setError("Both title and question are required");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await messageService.addMessage({
        title: title.trim(),
        question: question.trim(),
      });
      setTitle("");
      setQuestion("");
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit question",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="card mt-3">
      <div className="card-header">Ask question to Luv 2 Read Admin</div>
      <div className="card-body">
        {success && (
          <div className="alert alert-success" role="alert">
            Question submitted successfully!
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={45}
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="question" className="form-label">
              Question
            </label>
            <textarea
              id="question"
              className="form-control"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
    </div>
  );
};
