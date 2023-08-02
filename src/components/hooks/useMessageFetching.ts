import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useMessageFetching = () => {
  const [apiMessages, setApiMessages] = useState<any[]>([]);
  const [lastMessageDate, setLastMessageDate] = useState<string | undefined>(
    undefined
  );

  const fetchAndUpdateMessages = async (lastDate: string | undefined) => {
    try {
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
    }
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      await fetchAndUpdateMessages(undefined);
    };
    fetchInitialMessages();
  }, []);

  return { apiMessages, fetchAndUpdateMessages };
};
