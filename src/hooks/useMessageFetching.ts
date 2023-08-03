import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { MessageData } from "../types";

export const useMessageFetching = () => {
  const [apiMessages, setApiMessages] = useState<MessageData[]>([]);
  const [lastMessageId, setLastMessageId] = useState("");
  const isInitRef = useRef<boolean>();
  const [loading, setLoading] = useState(false);

  const fetchAndUpdateMessages = async () => {
    try {
      setLoading(true);

      const token = Cookies.get("token");
      const queryParams = new URLSearchParams({
        token: token || "",
        lastMessageId: lastMessageId || "",
      });

      const response = await fetch(
        `https://simple-chat-api-production.up.railway.app/api/chats/general/messages?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const { data = [] }: {data: MessageData[], lastMessageDate: string } = await response.json();

      data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

      if (data.length > 0){
        setLastMessageId(data[0].id)
        setApiMessages([ ...data.map((message) => ({
          ...message,
          created_at: new Date(message.created_at).toLocaleString("ru")
        })), ...apiMessages])
      }
    } catch (error) {
      console.error("Failed to fetch message data from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitRef.current) return
    isInitRef.current = true
    fetchAndUpdateMessages()
  }, []);

  return { apiMessages, fetchAndUpdateMessages, loading };
};
