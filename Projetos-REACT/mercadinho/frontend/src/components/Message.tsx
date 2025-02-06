import "./Message.css";

interface Props {
  message: string;
}

const Message = ({ message }: Props) => {
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
};

export default Message;
