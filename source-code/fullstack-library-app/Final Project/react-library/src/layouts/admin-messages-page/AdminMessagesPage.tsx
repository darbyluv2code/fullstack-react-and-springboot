import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import type { MessageModel } from "../../models/MessageModel";
import { messageService } from "../../services/messageService";
import { Navigate } from "react-router-dom";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Pagination } from "../../components/Pagination";
import { AdminMessage } from "./components/AdminMessage";

export const AdminMessagesPage = () => {
  const MESSAGES_PER_PAGE = 5;
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("admin");

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        setHttpError(null);
        const pageNo = currentPage - 1;
        const data = await messageService.getOpenAdminMessages(
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
    if (isAdmin) {
      fetchMessages();
    }
  }, [currentPage, refreshTrigger, isAdmin]);

  const handleRespond = async (id: number, response: string) => {
    await messageService.respondToMessage({ id, response });
    if (messages.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
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
};
