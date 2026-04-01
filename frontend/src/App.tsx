import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./screens/Landing";
import { Game } from "./screens/Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/game" element={<Game />}></Route>
    </Routes>
  );
}

export default App;
