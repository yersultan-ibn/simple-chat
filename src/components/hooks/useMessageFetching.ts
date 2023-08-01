import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useMessageFetching = (
  messages: any[],
  socketRef: any,
  initializeWebSocket: any
) => {
  const [apiMessages, setApiMessages] = useState<any[]>([]);
  const [showLoadMorePrompt, setShowLoadMorePrompt] = useState(false);
  const [olderMessagesLoaded, setOlderMessagesLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  const fetchAndUpdateMessages = (lastMessageDate: string | undefined) => {
    const token = Cookies.get("token");
    const queryParams = new URLSearchParams({
      token: token || "",
      lastMessageDate: lastMessageDate || "",
    });
    fetch(
      `https://simple-chat-api-production.up.railway.app/api/chats/general/messages?${queryParams}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.data.length === 0) {
          return;
        }

        const sortedMessages = data.data.sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        // Add new messages to the beginning of the apiMessages state
        setApiMessages((prevState) => [...sortedMessages, ...prevState]);
      })
      .catch((error) => {
        console.error("Failed to fetch message data from backend:", error);
      });
  };

  const handleLoadMoreMessages = () => {
    // Fetch messages when scrolling to the top
    const lastMessageDate = messages.length > 0 ? messages[0].date : undefined;
    fetchAndUpdateMessages(lastMessageDate);
    setShowLoadMorePrompt(false);
    setOlderMessagesLoaded(true); // Set the state after loading messages
  };

  useEffect(() => {
    if (socketRef.current) return;
    initializeWebSocket();

    const userEmail = localStorage.getItem("email") || "";
    setUserEmail(userEmail);

    // Fetch and update messages on initial load only if olderMessagesLoaded is false
    if (!olderMessagesLoaded) {
      const lastMessageDate =
        messages.length > 0 ? messages[0].date : undefined;
      fetchAndUpdateMessages(lastMessageDate);
      setOlderMessagesLoaded(true);
    }
  }, [olderMessagesLoaded]);

  useEffect(() => {
    // Fetch messages when scrolling to the top
    if (isScrollingToTop) {
      const lastMessageDate =
        messages.length > 0 ? messages[0].created_at : undefined;
      fetchAndUpdateMessages(lastMessageDate);
    }
  }, [isScrollingToTop]);

  return {
    apiMessages,
    showLoadMorePrompt,
    olderMessagesLoaded,
    userEmail,
    setIsScrollingToTop,
    handleLoadMoreMessages,
    setOlderMessagesLoaded,
  };
};
