import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import InputEmoji from "react-input-emoji";
import "./chat.scss";

let socket;

const Chat = ({ className, roomName, userName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = "https://react-chat-web.herokuapp.com/";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { userName, roomName }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <section className={`chat-box ${className}`}>
      <h3
        className="chat-box__room"
        style={{ marginBottom: "5px" }}
      >{`Users: ${users.map((user) => user.userName).join(" ,")}`}</h3>
      <h3 className="chat-box__room">
        <span></span> {roomName}
      </h3>

      <ScrollToBottom className="chat-box__text">
        {messages.map((item) => {
          return (
            <p
              key={item.text}
              className={`text ${
                item.user === userName ? "user-text" : "friend-text"
              }`}
            >
              {item.text}
              <span className={item.user === userName ? "user" : "friend"}>
                {item.user}
              </span>
            </p>
          );
        })}
      </ScrollToBottom>
      <form onSubmit={(e) => e.preventDefault()} className="chat-box__form">
        <InputEmoji
          value={message}
          onChange={setMessage}
          onEnter={sendMessage}
          placeholder="type something"
        />
        <button onClick={sendMessage}>Enter</button>
      </form>
    </section>
  );
};

export default Chat;
