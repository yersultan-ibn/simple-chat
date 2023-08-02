interface ReceivedMessageProps {
  message: any;
}

const ReceivedMessage: React.FC<ReceivedMessageProps> = ({
  message,
}: ReceivedMessageProps) => {
  //   console.log(message);
  return message.message_type === "message" ? (
    <div className="chat_message_container you">
      <div className="chat__bubble chat__bubble--you">
        <div className="message_time">{message && message.email}</div>
        {message && message.message_content}
      </div>
      <div className="message_time">{message && message.created_at}</div>
    </div>
  ) : null;
};

export default ReceivedMessage;
