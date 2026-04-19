import type { Color, PieceSymbol, Square } from "chess.js";

interface BoardProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}

const COLORS = {
  light: "#8d675e",
  dark: "#e7cdb2",
} as const;

const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const RANK_POSITIONS = [2.5, 15.75, 28.25, 40.75, 53.25, 65.75, 78.25, 90.75];
const FILE_POSITIONS = [10, 22.5, 35, 47.5, 60, 72.5, 85, 97.5];

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
  <text x={x} y={y} fontSize="2.8" fill={isLight ? COLORS.light : COLORS.dark}>
    {children}
  </text>
);

export const Chessboard = ({ board }: BoardProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div>Opponent</div>
      <div className="relative h-[80vh] w-[80vh] bg-[url('/200.png')] bg-[size:100%] rounded-md">
        {/* 1st Layer - renders the coordinates*/}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 pointer-events-none z-10"
        >
          {RANKS.map((rank, i) => (
            <CoordinateLabel
              key={`rank-${rank}`}
              x={0.75}
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
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {board.map((row, i) => {
            if (!row) return null;
            row.map((square, j) => {
              return (
                <div
                  key={`square-${i}-${j}`}
                  className="flex items-center justify-center relative"
                >
                  {square && (
                    <img
                      src=""
                      alt={`${square.type} - ${square.color}`}
                      className="w-[80%] h-[80%] object-contain"
                    />
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>
      <div>User</div>
    </div>
  );
};
