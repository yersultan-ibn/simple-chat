import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export const useMessageFetching = () => {
  const [apiMessages, setApiMessages] = useState<any[]>([]);
  const [lastMessageDate, setLastMessageDate] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const initializedRef = useRef(false); // Use useRef instead of useState

  const fetchAndUpdateMessages = async (lastDate: string | undefined) => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const queryParams = new URLSearchParams({
        token: token || "",
        lastMessageDate: lastMessageDate || "",
      });
      const response = await fetch(
        `https://simple-chat-api-production.up.railway.app/api/chats/general/messages?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApiMessages((prevMessages) => [...prevMessages, ...data.data]);
      setLastMessageDate(
        data.data[data.data.length - 1]?.created_at || undefined
      );
    } catch (error) {
      console.error("Failed to fetch message data from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      if (!initializedRef.current) {
        initializedRef.current = true;
        await fetchAndUpdateMessages(undefined);
      }
    };
    fetchInitialMessages();
  }, []);

  return { apiMessages, fetchAndUpdateMessages, loading };
};
