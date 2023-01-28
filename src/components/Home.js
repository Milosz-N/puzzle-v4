import Settings from "./Settings";
import Game from "./Game";
import { useState, useEffect } from "react";
function Home() {
  const [card, setCard] = useState([]);
  const [image, setImage] = useState(undefined);
  const [startGame, setStartGame] = useState(false);
  const [currentCount, setCount] = useState(10);
  const [startCount, setStartCount] = useState(false);
  const timer = () => setCount(currentCount + 1);
  useEffect(() => {
    if (startCount) {
      const myInterval = setInterval(() => {
        setCount((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(myInterval);
    }
  }, [startCount]);

  return (
    <>
      <Settings
        image={image}
        setImage={setImage}
        setStartGame={setStartGame}
        setStartCount={setStartCount}
      />
      <Game image={image} startGame={startGame} setStartCount={setStartCount} />
      <h2>{currentCount}</h2>
      <button
        className="btn btn-default"
        onClick={() => {
          setStartCount((prevState) => !prevState);
        }}
      >
        Submit
      </button>
    </>
  );
}

export default Home;
