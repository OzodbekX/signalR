import React, { FC,useState } from "react";
import { Form, Button } from "react-bootstrap";

const Lobby = ({joinRoom}) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  return (
    <Form 
    onSubmit={(e)=>{
      e.preventDefault()
      joinRoom(user,room)
    }}
    className={"lobby"}>
      <Form.Group>
        <Form.Control
        className="my-3"
          placeholder="name"
          onChange={(e) => setUser(e.target.value)}
        ></Form.Control>
        <Form.Control
        className="my-3"

          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button variant="success" type="submit" disabled={!user || !room}>
        Join
      </Button>
    </Form>
  );
};
export default Lobby;
