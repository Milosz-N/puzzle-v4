import Settings from "./Settings";
import Game from "./Game";
import { useState, useEffect } from "react";
import "../components/scss/main.scss";
function Home() {
  const [cardtest, setCardTest] = useState([]);
  const [images, setImages] = useState(
    require
      .context("../components/img", false, /\.(|jpe?g|)$/)
      .keys()
      .map(require.context("../components/img", false, /\.(|jpe?g|)$/))
  );
  const [image, setImage] = useState(undefined);
  const [startGame, setStartGame] = useState(false);
  const [currentCount, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const [finish, setFinish] = useState(false);
  const timer = () => setCount(currentCount + 1);
  useEffect(() => {
    if (startCount) {
      const myInterval = setInterval(() => {
        setCount((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(myInterval);
    }
  }, [startCount]);

  useEffect(() => {
    document.body.style.backgroundImage =
      "linear-gradient(90deg, #A6DAF5 36%, #CCF998 100%)";
  }, []);

  return (
    <>
      {!finish && !startGame && (
        <Settings
          images={images}
          image={image}
          setImage={setImage}
          setStartGame={setStartGame}
          setStartCount={setStartCount}
          setFinish={setFinish}
          setCardTest={setCardTest}
        />
      )}
      {!finish && startGame}
      <Game
        image={image}
        startGame={startGame}
        setStartCount={setStartCount}
        setFinish={setFinish}
        currentCount={currentCount}
        cardtest={cardtest}
        setCardTest={setCardTest}
      />
      {/* <button
        className="btn btn-default"
        onClick={() => {
          setStartCount((prevState) => !prevState);
        }}
      >
         button do pauzy
      </button> */}
      {finish && (
        <button
          className="buttonNewGame btnEndGame"
          disabled={!image}
          onClick={() => {
            setStartGame(false);
            setFinish(false);
            setCardTest([]);
            setCount(0);
          }}
        >
          Start new game
        </button>
      )}
    </>
  );
}

export default Home;
