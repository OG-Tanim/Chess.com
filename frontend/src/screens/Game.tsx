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
      id="base"
      className="md:h-dvh box-border bg-[url('/backgrounds/game-running.png')] bg-cover bg-center bg-no-repeat p-8"
    >
      <div className="h-full flex min-h-0 justify-center items-center">
        <div className="h-full grid md:grid-cols-6 grid-cols-1 gap-10">
          <div className="md:col-span-4 h-full min-h-0">
            <div className="min-h-0 h-full max-w-[80vh]">
              <Chessboard board={board} chess={chess}></Chessboard>
            </div>
          </div>

          <div className="md:col-span-2 h-full flex min-h-0 flex-col justify-center items-center p-10 bg-black/10 rounded-xl">
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
    </div>
  );
};
