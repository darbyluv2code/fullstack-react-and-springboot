import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../services/fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProtectedPage = () => {
  const [response, setResponse] = useState<string>("Loading...");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await fetchWithAuth(`${BASE_URL}/protected`);
        const data = await res.text();
        setResponse(data);
      } catch (err) {
        setResponse(`Error: ${err}`);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{response}</p>
    </div>
  );
};
