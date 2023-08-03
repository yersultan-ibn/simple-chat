import { MessageData } from "../../../types";

interface Props { 
  data: MessageData
}

export const SentMessage: React.FC<Props> = ({data}) => {
  const {message_content, created_at, email} = data
  return (
    <div className="chat_message_container me">
      <div className="chat__bubble chat__bubble--me">
        <div className="message_time">{email}</div>
        {message_content}
      </div>
      <div className="message_time">{created_at}</div>
    </div>
  );
};
