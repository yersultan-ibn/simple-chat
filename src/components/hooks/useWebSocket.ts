import { useEffect, useRef, useState } from "react";
import { wsUrl } from "../../constants";
import { WebSocketResponse } from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useWebSocket = () => {
  const navigate = useNavigate();
  const socketRef = useRef<WebSocket | undefined>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const [messages, setMessages] = useState<any>([]);

  const initializeWebSocket = () => {
    const token = localStorage.getItem("token");
    const newSocket = new WebSocket(`${wsUrl}/ws?token=${token}`);

    socketRef.current = newSocket;
    setSocket(newSocket);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handleSocketMessage = (event: any) => {
    const data: any = JSON.parse(event.data);

    if (data.type === "message") {
      setMessages((prevState: any) => [
        {
          id: data.id,
          content: Array.isArray(data.content)
            ? data.content.join(" ")
            : data.content,
          email: data.email,
          date: data.date,
          type: "message",
        },
        ...prevState, // Add the previous messages back to the array
      ]);
    } else if (data.type === "onlineUsers") {
      setOnlineUsers(
        Array.isArray(data.content) ? data.content : [data.content]
      );
    }

    if (data.type === "errorMessage") {
      handleSignOut();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${data.content}`,
      });
    }
  };
  useEffect(() => {
    if (socketRef.current) return;
    initializeWebSocket();

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.addEventListener("message", handleSocketMessage);
  }, [socket]);

  return {
    socket,
    socketRef,
    onlineUsers,
    messages,
    initializeWebSocket,
    handleSocketMessage,
    handleSignOut,
  };
};
