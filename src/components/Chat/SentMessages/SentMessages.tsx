interface SentMessageProps {
  message: any;
  userEmail: string;
}

const SentMessage: React.FC<SentMessageProps> = ({ message, userEmail }) => {
  return (
    <div className="chat_message_container me">
      <div className="chat__bubble chat__bubble--me">
        <div className="message_time">{userEmail}</div>
        {message && message.content}
      </div>
      <div className="message_time">{message && message.date}</div>
    </div>
  );
};

export default SentMessage;
