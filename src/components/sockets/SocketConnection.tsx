import React, { useEffect } from "react";
import Cookies from "js-cookie";

export const SocketConnection: React.FC = () => {
  useEffect(() => {
    // Токен для отправки в заголовке Cookie
    const token = Cookies.get("token");

    // Создаем экземпляр WebSocket
    const socket = new WebSocket(`ws://simple-chat-api-production.up.railway.app/ws?token=${token}`);

    // Обработчик события открытия соединения
    socket.onopen = () => {
      console.log("Соединение установлено.");
      socket.send("Hello, сервер!");
    };

    // Обработчик события получения сообщения от сервера
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Получено сообщение от сервера:", data);
    };

    // Обработчик события закрытия соединения
    socket.onclose = () => {
      console.log("Соединение закрыто.");
    };

    // Закрытие соединения при размонтировании компонента
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket соединение</h1>
    </div>
  );
};
