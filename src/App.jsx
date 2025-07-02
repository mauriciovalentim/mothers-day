import "./App.css";

import { useCallback, useState, useEffect } from "react";

import { wordsList } from "./data/words";

import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
];

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);

    const pickedWordAndCategory = useCallback(() => {
        const categories = Object.keys(words);
        const category =
            categories[
                Math.floor(Math.random() * Object.keys(categories).length)
            ];
        const word =
            words[category][Math.floor(Math.random() * words[category].length)];
        return { word, category };
    }, [words]);

    const startGame = useCallback(() => {
        clearLetterStates();
        const { word, category } = pickedWordAndCategory();
        console.log(word, category);
        let wordLetters = word.split("").map((letter) => letter.toLowerCase());
        console.log(wordLetters);

        setPickedWord(word);
        setPickedCategory(category);
        setLetters(wordLetters);
        setGameStage(stages[1].name);
    }, [pickedWordAndCategory]);

    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toLowerCase();

        if (
            guessedLetters.includes(normalizedLetter) ||
            wrongLetters.includes(normalizedLetter)
        ) {
            console.log("Essa letra não pode ser repetida!");
            return;
        }
        if (letters.includes(normalizedLetter)) {
            setGuessedLetters((currentGuessedLetters) => [
                ...currentGuessedLetters,
                normalizedLetter,
            ]);
        } else {
            setWrongLetters((currentWrongLetters) => [
                ...currentWrongLetters,
                normalizedLetter,
            ]);
            setGuesses((currentGuesses) => currentGuesses - 1);
        }
        // setGameStage(stages[2].name);
    };

    const clearLetterStates = () => {
        setGuessedLetters([]);

        setWrongLetters([]);
    };

    useEffect(() => {
        if (guesses <= 0) {
            // Game Over
            clearLetterStates();
            setGameStage(stages[2].name);
        }
    }, [guesses]);

    useEffect(() => {
        if (gameStage === stages[1].name) {
            // Player won
            const uniqueLetters = [...new Set(letters)];
            if (guessedLetters.length === uniqueLetters.length) {
                setScore((currentScore) => currentScore + 100);
                startGame();
            }
        }
    }, [guessedLetters, letters, startGame]);

    const retry = () => {
        setScore(0);
        setGuesses(3);

        setGameStage(stages[0].name);
    };
    return (
        <main className="App">
            {gameStage === "start" && <StartScreen startGame={startGame} />}
            {gameStage === "game" && (
                <Game
                    verifyLetter={verifyLetter}
                    pickedWord={pickedWord}
                    pickedCategory={pickedCategory}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                />
            )}
            {gameStage === "end" && <GameOver retry={retry} score={score} />}
        </main>
    );
}

export default App;
