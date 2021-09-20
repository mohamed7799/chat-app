import "./App.scss";
import Form from "./components/form/form";
import Chat from "./components/chat/chat";
import { useState } from "react";
function App() {
  const [access, setAccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  return (
    <main className="main">
      <header>
        <h1>Let`s chat</h1>
      </header>
      {!access && (
        <Form
          setUserName={setUserName}
          setAccess={setAccess}
          setRoomName={setRoomName}
          className="content"
        ></Form>
      )}
      {access && (
        <Chat
          roomName={roomName}
          userName={userName}
          className="content"
        ></Chat>
      )}
    </main>
  );
}

export default App;
