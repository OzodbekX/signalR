import React, { useEffect, useState } from "react";
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Connector from './signalr-class/index.ts'

const App = () => {
  // const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  //use in function mode.
  // const joinRoom = async (user, room) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl("https://localhost:7173/chat")
  //       .configureLogging(LogLevel.Information)
  //       .build();
  //     connection.on("ReceiveMessage", (user, message) => {
  //       console.log("message received: ", message);
  //       setMessages((messages) => [...messages, { user, message }]);
  //     });
  //     connection.on("UsersInRoom", (users) => {
  //       setUsers(users);
  //     });

  //     connection.onclose((e) => {
  //       setConnection();
  //       setMessagess([]);
  //       setUsers([]);
  //     });

  //     await connection.start();
  //     await connection.invoke("JoinRoom", { user, room });
  //     setConnection(connection);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const sendMessage = async (message) => {
  //   try {
  //     await connection.invoke("SendMessage", message);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const closeConnection = async () => {
  //   try {
  //     await connection.stop();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  //use with class

  const { SendMessage,closeConnection,connection, joinRoom } = Connector();


  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="mx-auto my-4" />
      {!connection ? (
        <Lobby joinRoom={(user, room)=>joinRoom(user, room,setMessages,setUsers)} />
      ) : (
        <Chat
          users={users}
          messages={messages}
          sendMessage={SendMessage}
          closeConnection={closeConnection}
        />
      )}
    </div>
  );
};

export default App;
