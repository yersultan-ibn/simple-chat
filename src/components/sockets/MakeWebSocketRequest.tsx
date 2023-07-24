export const makeWebSocketRequest = (token: any) => {
  // Создаем экземпляр WebSocket с использованием токена
  const socket = new WebSocket(`ws://simple-chat-api-production.up.railway.app/ws?token=${token}`);

  return new Promise((resolve, reject) => {
    // Обработчик события открытия соединения
    socket.onopen = () => {
      console.log("Соединение WebSocket установлено.");
      socket.send("Hello, сервер!"); // Отправка данных на сервер, если необходимо
    };

    // Обработчик события получения сообщения от сервера
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Получено сообщение от сервера:", data);
      resolve(data); // Разрешаем Promise с данными от сервера
    };

    // Обработчик события ошибки соединения
    socket.onerror = (error) => {
      console.error("Ошибка WebSocket соединения:", error);
      reject(error); // Отклоняем Promise с ошибкой
    };

    // Обработчик события закрытия соединения
    socket.onclose = () => {
      console.log("Соединение WebSocket закрыто.");
    };
  });
};
