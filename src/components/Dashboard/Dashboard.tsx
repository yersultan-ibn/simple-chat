import React, { useState } from "react";

export const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSendData = () => {
    // Выполняем запрос к WebSocket, передавая введенное значение
    const token = localStorage.getItem("token");
    const socket = new WebSocket(
      `ws://simple-chat-api-production.up.railway.app/ws?token=${token}`
    );

    socket.onopen = () => {
      console.log("Соединение WebSocket установлено.");
      socket.send(inputValue); // Отправляем значение из состояния inputValue
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Получено сообщение от сервера:", data);

      // Обновляем состояние компонента с полученными данными
      if (data.message) {
        setMessageFromServer(data.message);
      }
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket соединения:", error);
    };

    socket.onclose = () => {
      console.log("Соединение WebSocket закрыто.");
    };
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
