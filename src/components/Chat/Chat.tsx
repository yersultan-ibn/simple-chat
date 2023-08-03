import { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { FormSubmit } from "../helpers/FormSubmit";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useMessageFetching } from "../../hooks/useMessageFetching";
import { ReceivedMessage } from "./ReceivedMessage/ReceivedMessage";
import { SentMessage } from "./SentMessage/SentMessage";
import { MiniLoader } from "../Loader/MiniLoader";
import { MessageData } from "../../types";

export const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const {
    messages,
    userEmail,
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
      if (scrollTop === 0) {
        if (messages.length > 0) {
          const lastMessageDate = messages[messages.length - 1].created_at;

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
    if (loading){
      return <div className="chat__loading">
      <MiniLoader />
    </div>
    }

    return (
      <div className="chat__content pt-4 px-3" ref={containerRef}>
        <ul className="chat__list-messages">
          {/* {apiMessages.map((messageData: MessageData, index: any) => {
            if (messageData.message_type === "connection") {
              return (
                <li key={index} className="chat_info_alert">
                  <div className="chat__time">
                    {messageData.email} {messageData.message_content} at{" "}
                    {messageData.created_at}
                  </div>
                </li>
              );
            } else if (messageData.message_type === "message") {
              return messageData.email === userEmail ? (
                <SentMessage
                  key={index}
                  data={messageData}
                />
              ) : (
                <ReceivedMessage
                  key={index}
                  data={messageData}
                />
              );
            }
          }
          )} */}
          {messages.map((messageData: MessageData, index: number) => {
            if (messageData.message_type === "connection") {
              return (
                <li key={index} className="chat_info_alert">
                  <div className="chat__time">
                    {messageData.email} {messageData.message_content} at{" "}
                    {messageData.created_at}
                  </div>
                </li>
              );
            } 
            
            else if  (messageData.message_type === "message") {
              return messageData.email === userEmail ? (
                <SentMessage
                  key={index}
                  data={messageData}
                />
              ) : (
                <ReceivedMessage
                  key={index}
                  data={messageData}
                />
              );
            }
          })}
        </ul>
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
