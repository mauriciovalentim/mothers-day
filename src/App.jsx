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

    const pickedWordAndCategory = () => {
        const categories = Object.keys(words);
        const category =
            categories[
                Math.floor(Math.random() * Object.keys(categories).length)
            ];
        const word =
            words[category][Math.floor(Math.random() * words[category].length)];
        return { word, category };
    };

    const startGame = () => {
        const { word, category } = pickedWordAndCategory();
        console.log(word, category);
        let wordLetters = word.split("").map((letter) => letter.toLowerCase());
        console.log(wordLetters);

        setPickedWord(word);
        setPickedCategory(category);
        setLetters(wordLetters);
        setGameStage(stages[1].name);
    };
    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toLowerCase();

        if (
            guessedLetters.includes(normalizedLetter) ||
            wrongLetters.includes(normalizedLetter)
        ) {
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
    const retry = () => {
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
            {gameStage === "end" && <GameOver retry={retry} />}
        </main>
    );
}

export default App;
