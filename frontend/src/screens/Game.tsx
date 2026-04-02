import { Chessboard } from "../components/Chessboard";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";

export const Game = () => {
  const socket = useSocket();

  return (
    <div className="flex justify-center pt-8">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <Chessboard></Chessboard>
        </div>
        <Button onClick={() => {}}>Play</Button>
      </div>
    </div>
  );
};
