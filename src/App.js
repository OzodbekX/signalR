import React, { useState } from "react";
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessage] = useState([]);
  const [users, setUsers] = useState([]);


  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7173/chat")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("ReceiveMessage", (user, message) => {
        console.log("message received: ", message);
        setMessage((messages) => [...messages, { user, message }]);
      });
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };
  const sendMessage = async (message) => {
    try {
        await connection.invoke("SendMessage",message)
    } catch (e) {
      console.log(e);
    }
  };
  
  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="mx-auto my-4" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : ( 
        <Chat users={users} messages={messages} sendMessage={sendMessage} closeConnection={closeConnection}/>
      )}
    </div>
  );
};

export default App;
