import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 md:max-h-screen">
        <div className="col-span-2 flex justify-center p-8">
          <img
            className="max-w-[75%]"
            src="./chessboard.jpeg"
            alt="chessboard"
          />
        </div>
        <div className="md:col-span-1 flex flex-col justify-center items-center gap-6 pr-20">
          <h3 className="text-4xl md:text-5xl font-bold text-white text-center">
            Play Chess Online on the #2 Site!
          </h3>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-md">
            Join 250+ million players in the world's largest chess community
          </p>
          <Button
            onClick={() => {
              navigate("/game");
            }}
          >
            Play Online
          </Button>
        </div>
      </div>
    </div>
  );
};
