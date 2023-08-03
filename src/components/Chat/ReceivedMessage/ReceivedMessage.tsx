
interface ReceivedMessageProps {
  message: any;
  userEmail: string;
}

export const ReceivedMessage: React.FC<ReceivedMessageProps> = ({
  message,
  userEmail,
}) => {
  return (
    <div className="chat_message_container you">
      <div className="chat__bubble chat__bubble--you">
        <div className="message_time">{userEmail}</div>
        {message.content}
      </div>
      <div className="message_time">{message.date}</div>
    </div>
  );
};