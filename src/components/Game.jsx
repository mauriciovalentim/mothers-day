import "./Game.css";
import { useState, useRef } from "react";
const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // const letter = e.target.elements.letter.value.toLowerCase();
        // e.target.reset();

        // if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        //     return;
        // }

        // if (letters.includes(letter)) {
        //     guessedLetters.push(letter);
        // } else {
        //     wrongLetters.push(letter);
        //     guesses--;
        // }

        verifyLetter(letter);

        setLetter("");

        letterInputRef.current.focus();
    };

    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    <span key={i} className="letter">
                        {guessedLetters.includes(letter) ? letter : "_"}
                    </span>
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength={1}
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.length > 0 ? (
                    wrongLetters.map((letter, i) => (
                        <span key={i}>{letter}, </span>
                    ))
                ) : (
                    <p>Nenhuma letra utilizada ainda</p>
                )}
            </div>
        </div>
    );
};

export default Game;
