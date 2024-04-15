import "./App.css";
import Menu from "./components/menu";
import Quiz from "./components/quiz";
import EndScreen from "./components/endscreen";
import FullScreenBlocker from "./components/fullscreenblocker";
import { useState } from "react";
import { GameStateContext } from "./helpers/context";
// ['menu', 'playing', 'finished']
function App() {
  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <FullScreenBlocker></FullScreenBlocker>
      
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          userName,
          setUserName,
          score,
          setScore,
        }}
      >
        {gameState === "menu" && <Menu />}
        {gameState === "playing" && <Quiz />}
        {gameState === "finished" && <EndScreen />}
      </GameStateContext.Provider>
    </div>
  );
}

export default App;