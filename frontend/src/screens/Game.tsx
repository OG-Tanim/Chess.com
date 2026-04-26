import { Chessboard } from "../components/Chessboard";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) {
      return;
    }

    //message handlers
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          console.log("Game Initialized");
          setChess(new Chess());
          setBoard(chess.board());
          break;

        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move Made");
          break;

        case GAME_OVER:
          console.log("Game Over");
          break;
      }

      return () => {
        socket.onmessage = null;
      };
    };
  }, [socket]);

  // if (!socket) {
  //   console.log("socket set to null");
  //   return (
  //     <div className="flex justify-center pt-8 text-white">Connecting...</div>
  //   );
  // }
  return (
    <div
      className="flex min-h-screen justify-center item-center py-10"
      style={{
        backgroundImage: `url('${"/backgrounds/game-running.png"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
      }}
    >
      <div className="max-w-screen grid md:grid-cols-5 grid-cols-1 gap-20 place-items:center">
        <div className="md:col-span-3 max-h-[90%]">
          <Chessboard board={board}></Chessboard>
        </div>
        <div className="h-full w-full md:col-span-2 flex flex-col justify-center items-center p-8 bg-black/10 rounded-lg">
          <Button
            onClick={() => {
              if (socket)
                socket.send(
                  JSON.stringify({
                    type: "INIT_GAME",
                  }),
                );
            }}
          >
            Play
          </Button>
        </div>
      </div>
    </div>
  );
};
