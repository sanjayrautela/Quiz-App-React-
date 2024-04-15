import "../App.css";
import { Questions } from "../helpers/question";
import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../helpers/context";

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement != null);
    const [violationCount, setViolationCount] = useState(0);

    const { score, setScore, gameState, setGameState } = useContext(GameStateContext);

    const chooseOption = (option) => {
        setOptionChosen(option);
    };

    const nextQuestion = () => {
        if (Questions[currentQuestion].answer === optionChosen) {
            setScore(score + 1);
        }
        setCurrentQuestion(currentQuestion + 1);
    };

    const finishQuiz = () => {
        if (Questions[currentQuestion].answer === optionChosen) {
            setScore(score + 1);
        }
        setGameState("finished");
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement != null);
        };
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setViolationCount(violations => violations + 1);
            }
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            }
        }
    };

    return (
        <div className="Quiz">
            {!isFullScreen && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={handleFullScreen} style={{ padding: '10px', fontSize: '16px' }}>
                        Click to Enter Full Screen
                    </button>
                </div>
            )}
            {isFullScreen && (
                <>
                    <h1>{Questions[currentQuestion].prompt}</h1>
                    <div className="questions">
                        {['optionA', 'optionB', 'optionC', 'optionD'].map(option => (
                            <button key={option} onClick={() => chooseOption(option)}>
                                {Questions[currentQuestion][option]}
                            </button>
                        ))}
                    </div>
                    {currentQuestion === Questions.length - 1 ? (
                        <button onClick={finishQuiz} id="nextQuestion">
                            Finish Quiz
                        </button>
                    ) : (
                        <button onClick={nextQuestion} id="nextQuestion">
                            Next Question
                        </button>
                    )}
                    <p>Tab switch violations: {violationCount}</p>
                </>
            )}
        </div>
    );
}

export default Quiz;
