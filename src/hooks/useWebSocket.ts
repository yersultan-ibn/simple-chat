import { useEffect, useRef, useState } from "react";
import { wsUrl } from "../constants";
import { WebSocketResponse } from "../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useWebSocket = (inputValue: any, setInputValue: any) => {
  const navigate = useNavigate();
  const socketRef = useRef<WebSocket>();
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const initializeWebSocket = () => {
    const token = localStorage.getItem("token");
    const socket = new WebSocket(`${wsUrl}/ws?token=${token}`);

    socketRef.current = socket;
    setSocket(socket);
  };

  const handleSocketMessage = (event: any) => {
    const data: WebSocketResponse = JSON.parse(event.data);

    if (data.type === "message") {
      setMessages((prevState) => [
        ...prevState,
        {
          id: data.id,
          content: Array.isArray(data.content)
            ? data.content.join(" ")
            : data.content,
          email: data.email,
          date: data.date,
          type: "message",
        },
      ]);
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

  const handleSendData = () => {
    if (!socket) return;
    if (inputValue.trim() === "") return;
    socket.send(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendData();
    }
  };

  useEffect(() => {
    if (socketRef.current) return;
    initializeWebSocket();

    const userEmail = localStorage.getItem("email") || "";
    setUserEmail(userEmail);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        socket.close();
      }
    };
  }, [socket]);
  return {
    socket,
    messages,
    socketRef,
    userEmail,
    initializeWebSocket,
    handleSignOut,
    handleSocketMessage,
    handleSendData,
    handleKeyPress,
  };
};
