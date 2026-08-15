return (
  <div className="container mt-5">
    <h3>Pending Q/A:</h3>

    {messages.length > 0 ? (
      messages.map((message) => (
        <AdminMessage
          key={message.id}
          message={message}
          onRespond={handleRespond}
        />
      ))
    ) : (
      <h5 className="mt-3">No pending Q/A</h5>
    )}

    {totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />
    )}
  </div>
);
