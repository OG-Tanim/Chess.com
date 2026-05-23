import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useEffect, useState } from "react";

interface BoardProps {
  board: ({
    square: Square;
    type?: PieceSymbol;
    color?: Color;
  } | null)[][];
  chess: Chess;
}

const COLORS = {
  light: "var(--color-green-board-coordinate-light)",
  dark: "var(--color-green-board-coordinate-dark)",
} as const;

const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const RANK_POSITIONS = [2.5, 15.75, 28.25, 40.75, 53.25, 65.75, 78.25, 90.75];
const FILE_POSITIONS = [10.5, 23, 35.5, 48, 60.5, 73, 85.5, 98];

const CoordinateLabel = ({
  x,
  y,
  children,
  isLight,
}: {
  x: number;
  y: number;
  children: string;
  isLight: boolean;
}) => (
  <text
    x={x}
    y={y}
    fontSize="2.5"
    fontWeight="700"
    fill={isLight ? COLORS.light : COLORS.dark}
  >
    {children}
  </text>
);

export const Chessboard = ({ board, chess }: BoardProps) => {
  const [absBoard, setAbsBoard] = useState<typeof board>(board);
  const [selectedSquare, setSelectedSqure] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[] | null>(null);

  useEffect(() => {
    const abstractBoard: typeof board = [];

    for (let i = 0; i < 8; i++) {
      // 1. Initialize the row
      abstractBoard[i] = [];

      for (let j = 0; j < 8; j++) {
        if (board[i][j] == null) {
          // 2. Push an object for empty squares
          abstractBoard[i].push({ square: `${FILES[j]}${RANKS[i]}` as Square });
        } else {
          // 3. Push the existing piece object
          abstractBoard[i].push(board[i][j]);
        }
      }
    }

    setAbsBoard(abstractBoard);
  }, []);

  const handleSquareClick = (square: Square) => {
    setSelectedSqure(square);
    const validMoves = chess.moves({ square: square, verbose: true });
    const moves: Square[] = [];

    validMoves.map((move) => {
      moves.push(move.to);
    });

    setLegalMoves(moves);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div>Opponent</div>
      <div
        className="relative bg-[url('/backgrounds/board-game-green.png')] bg-cover bg-no-repeat bg-center rounded-md"
        onClick={() => {
          setSelectedSqure(null);
          setLegalMoves(null);
        }}
      >
        {/* 1st Layer - renders the coordinates*/}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 pointer-events-none z-10"
        >
          {RANKS.map((rank, i) => (
            <CoordinateLabel
              key={`rank-${rank}`}
              x={0.5}
              y={RANK_POSITIONS[i]}
              isLight={i % 2 === 0}
            >
              {rank}
            </CoordinateLabel>
          ))}
          {FILES.map((file, i) => (
            <CoordinateLabel
              key={`file-${file}`}
              x={FILE_POSITIONS[i]}
              y={99}
              isLight={i % 2 === 1}
            >
              {file}
            </CoordinateLabel>
          ))}
        </svg>

        {/* 2nd Layer - render the Pieces*/}
        <div className="h-full grid grid-cols-8 grid-rows-8 place-items-center">
          {absBoard.map((row, i) => {
            if (!row) {
              return <div></div>;
            } else {
              return row.map((square, j) => {
                if (!square) return <div></div>;
                if (!square.color) {
                  if (legalMoves?.includes(square.square))
                    return (
                      <div className="h-[25%] w-[25%] rounded-full bg-black/25"></div>
                    );
                  else return <div></div>;
                }
                return (
                  <div
                    key={`square-${i}-${j}`}
                    className={`h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing focus:bg-button-primary/50 ${selectedSquare === square.square ? "bg-button-primary/50" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSquareClick(square.square);
                    }}
                  >
                    {legalMoves?.includes(square.square) && (
                      <div className="h-full w-full rouded-full border-2 border-black/25 items-center"></div>
                    )}

                    <img
                      className={`w-full h-full object-contain ${legalMoves?.includes(square.square) ? "rounded-full border-2 border-black/25" : ""}`}
                      src={`/pieces/${square.color}${square.type}.png`}
                      alt={`piece - ${square.color}${square.type}`}
                    />
                  </div>
                );
              });
            }
          })}
        </div>
      </div>
      <div>User</div>
    </div>
  );
};
