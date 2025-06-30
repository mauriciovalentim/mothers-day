import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
    return (
        <div className="start">
            <h1>Mother's Day</h1>
            <p>Clique no boão abaixo para começar a jogar</p>
            <button onClick={startGame}>Começar a jogar</button>
        </div>
    );
};

export default StartScreen;
