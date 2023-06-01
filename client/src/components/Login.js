import "./login.css";
import Chat from "./Chat";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export default function Login() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
  
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
    return(
        <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 style={{color:"#286df5"}}>Join a chat</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
    );
}