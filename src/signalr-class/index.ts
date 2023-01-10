import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
const URL = "https://localhost:7173/chat";
class Connector {
  public connection: HubConnection | null;
  static instance: Connector;
  public events: (
    onMessageReceived: (username: string, message: string) => void
  ) => void;
  constructor() {
    if (!!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(URL)
        .withAutomaticReconnect()
        .build();
    } else if (this.connection !== null) {
      this.connection?.start()?.catch((err) => document.write(err));
      this.events = (onMessageReceived) => {
        this.connection?.on("ReceiveMessage", (username, message) => {
          onMessageReceived(username, message);
        });
      };
    }
  }
  public joinRoom = async (
    user: any,
    room: any,
    setMessages: any,
    setUsers:any
  ) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7173/chat")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("ReceiveMessage", (user, message) => {
        console.log("message received: ", message);
        setMessages((messages) => [...messages, { user, message }]);
      });
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        this.connection = null;
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      this.connection = connection;
    } catch (e) {
      console.log(e);
    }
  };
  public SendMessage = (messages: string) => {
    this.connection &&
      this.connection
        .send("SendMessage", messages)
        .then((x) => console.log("sent"));
  };
  public closeConnection = () => {
    this.connection &&
    this.connection.stop()
  };
  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;
