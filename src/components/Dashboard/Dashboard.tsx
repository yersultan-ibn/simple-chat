import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardMessage {
  message: string;
  errorMessage: string;
}

export const Dashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messageFromServer, setMessageFromServer] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeWebSocket = () => {
      const token = localStorage.getItem("token");
      const socket = new WebSocket(
        `ws://simple-chat-api-production.up.railway.app/ws?token=${token}`
      );

      const handleSocketOpen = () => {
        console.log("WebSocket соединение установлено.");
        socket.send("Hello, сервер!");
      };

      const handleSocketMessage = (event: MessageEvent) => {
        const data: DashboardMessage = JSON.parse(event.data);
        console.log("Получено сообщение от сервера:", data);

        if (data.message) {
          setMessageFromServer(data.message);
        }

        if (data.errorMessage) {
          setErrorMessage(data.errorMessage);
          localStorage.removeItem("token");
          Cookies.remove("token");
        }
      };

      const handleSocketError = (error: Event) => {
        console.error("Ошибка WebSocket соединения:", error);
      };

      const handleSocketClose = (event: CloseEvent) => {
        console.log("WebSocket соединение закрыто.");
        if (event.code === 1000) {
          console.log("WebSocket соединение закрыто успешно.");
        } else {
          console.error("Ошибка WebSocket соединения:", event.reason);
        }
      };

      socket.addEventListener("open", handleSocketOpen);
      socket.addEventListener("message", handleSocketMessage);
      socket.addEventListener("error", handleSocketError);
      socket.addEventListener("close", handleSocketClose);

      return socket;
    };

    const socket = initializeWebSocket();

    return () => {
      socket.close();
    };
  }, [navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendData = () => {
    const token = localStorage.getItem("token");
    const socket = new WebSocket(
      `ws://simple-chat-api-production.up.railway.app/ws?token=${token}`
    );

    const handleSocketOpen = () => {
      console.log("WebSocket соединение установлено.");
      socket.send(inputValue);
      setSentMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue("");
    };

    const handleSocketMessage = (event: MessageEvent) => {
      const data: DashboardMessage = JSON.parse(event.data);
      console.log("Получено сообщение от сервера:", data);

      if (data.message) {
        setMessageFromServer(data.message);
      }

      if (data.errorMessage) {
        setErrorMessage(data.errorMessage);
        localStorage.removeItem("token");
        Cookies.remove("token");
        navigate("/sign-in");
      }
    };

    const handleSocketError = (error: Event) => {
      console.error("Ошибка WebSocket соединения:", error);
    };

    const handleSocketClose = () => {
      console.log("WebSocket соединение закрыто.");
    };

    socket.addEventListener("open", handleSocketOpen);
    socket.addEventListener("message", handleSocketMessage);
    socket.addEventListener("error", handleSocketError);
    socket.addEventListener("close", handleSocketClose);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Dashboard!</h1>
      <div className="input-container">
        <input
          className="data-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter data to send via WebSocket"
        />
        <button className="send-button" onClick={handleSendData}>
          Send Data
        </button>
      </div>
      {sentMessages.length > 0 && (
        <div className="sent-messages-container">
          <h2 className="sent-messages-title">Sent Messages:</h2>
          <ul className="sent-messages-list">
            {sentMessages.map((message, index) => (
              <li key={index} className="sent-message-item">
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      {messageFromServer && (
        <div className="message-container">
          <h2 className="message-title">Message from Server:</h2>
          <p className="message-text">{messageFromServer}</p>
        </div>
      )}
    </div>
  );
};
