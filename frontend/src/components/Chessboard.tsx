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
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>Opponent</div>
      <div>
        <img className="rounded-sm" src="./chessboard-bg.jpeg" alt="" />
      </div>
      <div>User</div>
    </div>
  );
};
