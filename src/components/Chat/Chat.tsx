import { useEffect, useRef, useState } from "react";
import { wsUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { WebSocketResponse } from "../../types";
import "./Chat.scss";
import { FormSubmit } from "../helpers/FormSubmit";
import Swal from "sweetalert2";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useMessageFetching } from "../../hooks/useMessageFetching";
import { ReceivedMessage } from "./ReceivedMessage/ReceivedMessage";
import { SentMessage } from "./SentMessages/SentMessages";
import { FaSpinner } from "react-icons/fa";
import { Loader } from "../Loader/Loader";
import { MiniLoader } from "../Loader/MiniLoader";
import { SavedReceivedMessages } from "./SavedReceivedMessages/SavedReceivedMessages";
export const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const {
    socket,
    messages,
    socketRef,
    userEmail,
    initializeWebSocket,
    handleSocketMessage,
    handleSignOut,
    handleSendData,
    handleKeyPress,
  } = useWebSocket(inputValue, setInputValue);
  const { fetchAndUpdateMessages, apiMessages, loading } = useMessageFetching();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      console.log("scrollTop", scrollTop);
      if (scrollTop === 0) {
        if (messages.length > 0) {
          const lastMessageDate = messages[messages.length - 1].date;

          fetchAndUpdateMessages(lastMessageDate);
        }
      }
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  const renderMessages = () => {
    const getLastTwoJoinMessages = (email: any) => {
      const userJoinMessages = apiMessages.filter(
        (messageData) =>
          messageData.message_type === "connection" &&
          messageData.email === email
      );
      return userJoinMessages.slice(-1);
    };

    const uniqueUserEmails = Array.from(
      new Set(apiMessages.map((messageData) => messageData.email))
    );

    return (
      <div className="chat__content pt-4 px-3" ref={containerRef}>
        {uniqueUserEmails.length > 0 && (
          <ul className="chat__list-messages">
            {uniqueUserEmails.map((email) => {
              const lastTwoJoinMessages = getLastTwoJoinMessages(email);
              return lastTwoJoinMessages.map((messageData) => (
                <li key={messageData.id} className="chat_info_alert">
                  <div className="chat__time">
                    {messageData.email} joined at {messageData.created_at}
                  </div>
                </li>
              ));
            })}
          </ul>
        )}
        {loading ? (
          <div className="chat__loading">
            <MiniLoader />
            Loading...
          </div>
        ) : (
          <ul className="chat__list-messages">
            {apiMessages.map((messageData: any, index: any) => (
              <SavedReceivedMessages
                key={index}
                message={messageData}
                userEmail={userEmail}
              />
            ))}
            {messages.map((messageData: any, index: number) => {
              return messageData.email === userEmail ? (
                <SentMessage
                  key={index}
                  message={messageData}
                  userEmail={userEmail}
                />
              ) : (
                <ReceivedMessage
                  key={index}
                  message={messageData}
                  userEmail={userEmail}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat__wrapper py-2 pt-mb-2 pb-md-3">
          <div className="chat__messaging messaging-member--online pb-2 pb-md-2 pl-2 pl-md-4 pr-2">
            <div className="chat__infos pl-2 pl-md-0">
              <div className="chat-member__wrapper" data-online="true">
                <div className="chat-member__details">
                  <span className="chat-member__name">Simple Chat</span>

                  <p className="title">General</p>
                  <FormSubmit
                    buttonText="Sign out"
                    buttonStyles="chat-member__signout"
                    onClick={handleSignOut}
                  />
                </div>
              </div>
            </div>
          </div>

          {renderMessages()}

          <div className="chat__send-container px-2 px-md-3 pt-1 pt-md-3">
            <div className="custom-form__send-wrapper">
              <input
                className="form-control custom-form"
                id="message"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter data to send via WebSocket"
              />
              <div className="custom-form__send-img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon svg-icon--send-img"
                  viewBox="0 0 45.7 45.7"
                >
                  <path
                    d="M6.6,45.7A6.7,6.7,0,0,1,0,39.1V6.6A6.7,6.7,0,0,1,6.6,0H39.1a6.7,6.7,0,0,1,6.6,6.6V39.1h0a6.7,6.7,0,0,1-6.6,6.6ZM39,4H6.6A2.6,2.6,0,0,0,4,6.6V39.1a2.6,2.6,0,0,0,2.6,2.6H39.1a2.6,2.6,0,0,0,2.6-2.6V6.6A2.7,2.7,0,0,0,39,4Zm4.7,35.1Zm-4.6-.4H6.6a2.1,2.1,0,0,1-1.8-1.1,2,2,0,0,1,.3-2.1l8.1-10.4a1.8,1.8,0,0,1,1.5-.8,2.4,2.4,0,0,1,1.6.7l4.2,5.1,6.6-8.5a1.8,1.8,0,0,1,1.6-.8,1.8,1.8,0,0,1,1.5.8L40.7,35.5a2,2,0,0,1,.1,2.1A1.8,1.8,0,0,1,39.1,38.7Zm-17.2-4H35.1l-6.5-8.6-6.5,8.4C22,34.6,22,34.7,21.9,34.7Zm-11.2,0H19l-4.2-5.1Z"
                    fill="#f68b3c"
                  />
                </svg>
              </div>
              <div className="custom-form__send-emoji">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon svg-icon--send-emoji"
                  viewBox="0 0 46.2 46.2"
                >
                  <path
                    d="M23.1,0A23.1,23.1,0,1,0,46.2,23.1,23.1,23.1,0,0,0,23.1,0Zm0,41.6A18.5,18.5,0,1,1,41.6,23.1,18.5,18.5,0,0,1,23.1,41.6Zm8.1-20.8a3.5,3.5,0,0,0,3.5-3.5,3.5,3.5,0,0,0-7,0,3.5,3.5,0,0,0,3.5,3.5ZM15,20.8a3.5,3.5,0,0,0,3.5-3.5A3.5,3.5,0,0,0,15,13.9a3.4,3.4,0,0,0-3.4,3.4A3.5,3.5,0,0,0,15,20.8Zm8.1,15a12.6,12.6,0,0,0,10.5-5.5,1.7,1.7,0,0,0-1.3-2.6H14a1.7,1.7,0,0,0-1.4,2.6A12.9,12.9,0,0,0,23.1,35.8Z"
                    fill="#f68b3c"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="custom-form__send-submit"
                onClick={handleSendData}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon svg-icon--send"
                  viewBox="0 0 45.6 45.6"
                >
                  <g>
                    <path
                      d="M20.7,26.7a1.4,1.4,0,0,1-1.2-.6,1.6,1.6,0,0,1,0-2.4L42.6.5a1.8,1.8,0,0,1,2.5,0,1.8,1.8,0,0,1,0,2.5L21.9,26.1A1.6,1.6,0,0,1,20.7,26.7Z"
                      fill="#d87232"
                    />
                    <path
                      d="M29.1,45.6a1.8,1.8,0,0,1-1.6-1L19.4,26.2,1,18.1a1.9,1.9,0,0,1-1-1.7,1.8,1.8,0,0,1,1.2-1.6L43.3.1a1.7,1.7,0,0,1,1.8.4,1.7,1.7,0,0,1,.4,1.8L30.8,44.4a1.8,1.8,0,0,1-1.6,1.2ZM6.5,16.7l14.9,6.6a2,2,0,0,1,.9.9l6.6,14.9L41,4.6Z"
                      fill="#d87232"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
