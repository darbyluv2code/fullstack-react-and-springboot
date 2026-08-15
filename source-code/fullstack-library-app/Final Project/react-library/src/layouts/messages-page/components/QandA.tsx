import { useEffect, useState } from "react";
import type { MessageModel } from "../../../models/MessageModel";
import { messageService } from "../../../services/messageService";
import { SpinnerLoading } from "../../../components/SpinnerLoading";
import { Pagination } from "../../../components/Pagination";

interface QandAProps {
  isActive?: boolean;
}

export const QandA = ({ isActive }: QandAProps) => {
  const MESSAGES_PER_PAGE = 5;

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        setHttpError(null);
        const pageNo = currentPage - 1;
        const data = await messageService.getUserMessage(
          pageNo,
          MESSAGES_PER_PAGE,
        );
        setMessages(data.content);
        setTotalPages(data.page.totalPages);
      } catch (error) {
        setHttpError(
          error instanceof Error ? error.message : "An error has occured.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (isActive) {
      fetchMessages();
    }
  }, [currentPage, isActive]);

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <>
      <h5 className="mt-3">Current Q/A:</h5>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className="card mt-2 shadow p-3 bg-body rounded"
          >
            <h5>
              Case #{message.id}: {message.title}
            </h5>
            <h6>{message.userEmail}</h6>
            <p>{message.question}</p>
            <hr />
            <div>
              <h5>Response:</h5>
              {message.response && message.adminEmail ? (
                <>
                  <h6>{message.adminEmail} (admin)</h6>
                  <p>{message.response}</p>
                </>
              ) : (
                <p>Pending response from administration. Please be patient.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>All questions you submit will be shown here.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
      )}
    </>
  );
};
