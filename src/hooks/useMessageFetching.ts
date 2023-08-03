import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { MessageData } from "../types";
import { compareAsc } from "date-fns";

export const useMessageFetching = () => {
  const [apiMessages, setApiMessages] = useState<MessageData[]>([]);
  const [lastMessageDate, setLastMessageDate] = useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);
  const initializedRef = useRef(false); // Use useRef instead of useState

  const fetchAndUpdateMessages = async () => {
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
      
      const { data }: {data: MessageData[], lastMessageDate: string } = await response.json();
      data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      
      setLastMessageDate(new Date(data[0].created_at).toISOString())
      setApiMessages(data)
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
        await fetchAndUpdateMessages();
      }
    };
    fetchInitialMessages();
  }, []);

  return { apiMessages, fetchAndUpdateMessages, loading };
};
