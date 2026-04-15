import { Move } from "./validation.js";
import Game from "./Game.js";
import { ERROR, INIT_GAME, MOVE, PENDING } from "./messages.js";
import { WebSocket } from "ws";

class GameManager {
  private games: Game[];
  public users: WebSocket[];
  private pendingUser: WebSocket | null;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user != socket);
  }

  //Message Handler
  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      //Initialize a game
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          //start a game
          const game = new Game(this.pendingUser, socket);
          //add the game to active games
          this.games.push(game);
          //set pendingUser to null
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;

          if (socket.readyState == 1) {
            socket.send(
              JSON.stringify({
                type: PENDING,
                payload: {
                  message: "pending user set",
                },
              }),
            );
          }
        }
      }

      //Move
      if (message.type === MOVE) {
        //validate the input data - payload (message.payload)
        const result = Move.safeParse(message.payload);

        if (!result.success) {
          socket.send(
            JSON.stringify({
              type: ERROR,
              Payload: result.error,
            }),
          );
        } else {
          const payload = result.data;

          //find the game for the socket
          const game = this.games.find(
            (game) => game.player1 === socket || game.player2 === socket,
          );

          //make the move
          if (game) {
            game.makeMove(socket, payload);
          }
        }
      }
    });
  }
}

export default GameManager;
