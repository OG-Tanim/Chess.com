import type { Color, PieceSymbol, Square } from "chess.js";

interface board {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}

export const Chessboard = ({ board }: board) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>Opponent</div>
      <div className="h-[80vh] w-[80vh] my-4 bg-[url('/chessboard-bg.jpeg')] bg-[size:100%] bg-center bg-no-repeat rounded-md"></div>
      <div>User</div>
    </div>
  );
};
