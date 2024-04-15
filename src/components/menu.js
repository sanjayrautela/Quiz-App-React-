import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/context";

function Menu() {
    const { gameState, setGameState, userName, setUserName } = useContext(
        GameStateContext
    );
    return (
        <div className="Menu">
            <label>Enter Your Name:</label>
            <input
                type="text"
                placeholder="Ex-Sanjay Rautela"
                onChange={(event) => {
                    setUserName(event.target.value);
                }}
            />
            <button
                onClick={() => {
                    setGameState("playing");
                }}
            >
                Start Quiz
            </button>
        </div>
    );
}

export default Menu;