interface SavedReceivedMessagesProps {
  message: any;
  userEmail: any;
}

export const SavedReceivedMessages: React.FC<SavedReceivedMessagesProps> = ({
  message,
  userEmail,
}) => {
  if (message.message_type === "message") {
    return (
      <div
        className={`chat_message_container saved_container ${
          message.email === userEmail ? "me" : "you"
        }`}
      >
        <div
          className={`chat__bubble ${
            message.email === userEmail
              ? "chat__bubble--me"
              : "chat__bubble--you"
          }`}
        >
          <div className="message_time">{message && message.email}</div>
          {message && message.message_content}
        </div>
        <div className="message_time">{message && message.created_at}</div>
      </div>
    );
  } else {
    return null;
  }
};
