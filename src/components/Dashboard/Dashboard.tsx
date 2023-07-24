import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardMessage {
  message: string;
}

export const Dashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messageFromServer, setMessageFromServer] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new WebSocket(
      `ws://simple-chat-api-production.up.railway.app/ws?token=${token}`
    );

    socket.onopen = () => {
      console.log("Соединение WebSocket установлено.");
      socket.send("Hello, сервер!");
    };

    socket.onmessage = (event: MessageEvent) => {
      const data: DashboardMessage = JSON.parse(event.data);
      console.log("Получено сообщение от сервера:", data);

      if (data.message) {
        setMessageFromServer(data.message);
      }
    };

    socket.onerror = (error: Event) => {
      console.error("Ошибка WebSocket соединения:", error);
      navigate("/");
    };

    socket.onclose = (event: CloseEvent) => {
      console.log("Соединение WebSocket закрыто.");
      if (event.code === 1000) {
        console.log("Соединение закрыто успешно.");
      } else {
        console.error("Ошибка WebSocket соединения:", event.reason);
        navigate("/");
      }
    };

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

    socket.onopen = () => {
      console.log("Соединение WebSocket установлено.");
      socket.send(inputValue);
    };

    socket.onmessage = (event: MessageEvent) => {
      const data: DashboardMessage = JSON.parse(event.data);
      console.log("Получено сообщение от сервера:", data);

      if (data.message) {
        setMessageFromServer(data.message);
      }
    };

    socket.onerror = (error: Event) => {
      console.error("Ошибка WebSocket соединения:", error);
    };

    socket.onclose = () => {
      console.log("Соединение WebSocket закрыто.");
    };
    setInputValue("");
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
      {messageFromServer && (
        <div className="message-container">
          <h2 className="message-title">Message from Server:</h2>
          <p className="message-text">{messageFromServer}</p>
        </div>
      )}
    </div>
  );
};
