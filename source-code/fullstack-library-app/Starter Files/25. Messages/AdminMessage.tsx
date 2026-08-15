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

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Response"}
      </button>
    </form>
  </div>
);
