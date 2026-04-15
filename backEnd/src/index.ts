import { WebSocketServer, WebSocket } from "ws";
import GameManager from "./GameManager.js";

const wss = new WebSocketServer({ port: 8080 });

//this runs as soons as the the WS server is initialized
const gameManager = new GameManager();

wss.on("connection", function connection(socket: WebSocket, request) {
  //add the user to the socket Server run-time memory
  gameManager.addUser(socket);
  console.log(gameManager.users.length);

  //remove the user from run-Time memmory
  socket.on("close", () => {
    gameManager.removeUser(socket);
    console.log("User Disconnected");
  });

  socket.on("error", console.error);

  // socket.on("message", function message(data) {
  //   console.log("received: %s", data);
  // });

  if (socket.readyState == 1)
    socket.send(`hi, you have connected successfully`);
  console.log("User Connected");
});
